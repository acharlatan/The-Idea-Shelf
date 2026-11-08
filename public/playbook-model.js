/* Prepare a project from a playbook without changing existing work. */
(() => {
  'use strict';
  const normalized = value => typeof value === 'string' ? value.trim().replace(/\s+/g,' ').toLocaleLowerCase() : '';
  function makePlan(playbook) {
    return [
      `PLAYBOOK: ${playbook.title}`,
      `INTENDED OUTCOME: ${playbook.outcome}`,
      `YOU WILL NEED: ${playbook.needs}`,
      ...playbook.steps.map((step,index)=>`\n${index+1}. ${step.title}\n${step.detail}\nAsk yourself: ${step.prompt}`),
      `\nFICTIONAL EXAMPLE: ${playbook.example}`,
      `\nFINISHING CHECK: ${playbook.checkpoint}`,
      '\nAdapt these starting points to the real details of your project.'
    ].join('\n');
  }
  function apply(project, playbook, makeId) {
    if (!project || typeof project.id !== 'string' || !playbook || !Array.isArray(playbook.steps) || !Array.isArray(playbook.ideas) || typeof makeId !== 'function') throw new Error('A project and a complete playbook are required.');
    for(const field of ['ideaIds','tasks','plans'])if(project[field]!==undefined&&!Array.isArray(project[field]))throw new Error('This project has unexpected data and cannot be updated safely.');
    const ideas=Array.isArray(project.ideaIds)?[...project.ideaIds]:[];
    const tasks=Array.isArray(project.tasks)?[...project.tasks]:[];
    const plans=Array.isArray(project.plans)?[...project.plans]:[];
    let addedIdeas=0,addedTasks=0,addedPlans=0;
    const ideaSet=new Set(ideas);
    for(const id of playbook.ideas)if(typeof id==='string'&&!ideaSet.has(id)){ideas.push(id);ideaSet.add(id);addedIdeas++;}
    const taskSet=new Set(tasks.map(task=>normalized(task?.text)).filter(Boolean));
    for(const step of playbook.steps){const text=typeof step.task==='string'?step.task.trim():'';const key=normalized(text);if(key&&!taskSet.has(key)){tasks.push({id:makeId(),text,done:false});taskSet.add(key);addedTasks++;}}
    const title=`Playbook: ${playbook.title}`;
    if(!plans.some(plan=>normalized(plan?.title)===normalized(title))){plans.push({id:makeId(),title,text:makePlan(playbook)});addedPlans++;}
    return {project:{...project,ideaIds:ideas,tasks,plans},addedIdeas,addedTasks,addedPlans};
  }
  globalThis.ShelfPlaybookModel={apply,makePlan};
})();

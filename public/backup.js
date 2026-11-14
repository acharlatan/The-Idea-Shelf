/* Merge old and current Idea Shelf backups without overwriting existing work. */
(() => {
  'use strict';
  const object = v => v && typeof v === 'object' && !Array.isArray(v);
  function merge(data, current, ids) {
    if (!object(data) || data.kind !== 'the-idea-shelf-backup' || data.version !== 1 || !Array.isArray(data.saved) || !object(data.notes)) throw new Error('Choose an Idea Shelf backup file.');
    const ideas = new Set(ids.ideas), guides = new Set(ids.guides);
    const saved = [...new Set([...(Array.isArray(current.saved)?current.saved:[]),...data.saved.filter(id=>typeof id==='string'&&ideas.has(id))])];
    const notes = object(current.notes)?{...current.notes}:{};
    for (const [id,value] of Object.entries(data.notes)) if (ideas.has(id) && typeof value==='string' && value.length<=2000 && !notes[id]) notes[id]=value;
    const projects=Array.isArray(current.projects)?[...current.projects]:[], existingIds=new Set(projects.map(p=>p.id));
    function cleanProject(p) {
      if(!object(p)||typeof p.id!=='string'||p.id.length>120||typeof p.name!=='string'||!p.name.trim()||p.name.length>100)return null;
      return {id:p.id,name:p.name,description:typeof p.description==='string'?p.description.slice(0,1000):'',notes:typeof p.notes==='string'?p.notes.slice(0,10000):'',ideaIds:Array.isArray(p.ideaIds)?[...new Set(p.ideaIds.filter(x=>typeof x==='string'&&ideas.has(x)))].slice(0,100):[],tasks:Array.isArray(p.tasks)?p.tasks.filter(t=>object(t)&&typeof t.id==='string'&&t.id.length<=120&&typeof t.text==='string'&&t.text.length<=250).slice(0,200).map(t=>({id:t.id,text:t.text,done:!!t.done})):[],plans:Array.isArray(p.plans)?p.plans.filter(t=>object(t)&&typeof t.id==='string'&&t.id.length<=120&&typeof t.text==='string'&&t.text.length<=15000).slice(0,100).map(t=>({id:t.id,title:typeof t.title==='string'?t.title.slice(0,120):'Working plan',text:t.text})):[]};
    }
    for(const raw of Array.isArray(data.projects)?data.projects:[]){const p=cleanProject(raw);if(p&&!existingIds.has(p.id)){projects.push(p);existingIds.add(p.id);}}
    const exercises=object(current.exercises)?{...current.exercises}:{};
    if(object(data.exercises))for(const [id,answers] of Object.entries(data.exercises))if(guides.has(id)&&Array.isArray(answers)&&!exercises[id])exercises[id]=answers.slice(0,3).map(x=>typeof x==='string'?x.slice(0,3000):'');
    const challenges=[...new Set([...(Array.isArray(current.challenges)?current.challenges:[]),...(Array.isArray(data.challenges)?data.challenges.filter(x=>typeof x==='string'&&x.length<100):[])])];
    let brief=current.brief,studio=current.studio;
    if(!brief&&object(data.brief)&&typeof data.brief.text==='string'&&data.brief.text.length<10000)brief=data.brief;
    if(!studio&&object(data.studio)&&JSON.stringify(data.studio).length<30000)studio=data.studio;

    const pub = v => {
      const out={saved:[],notes:{},experiments:{}};
      if(!object(v))return out;
      const valid=id=>typeof id==='string'&&/^[a-z0-9-]{1,100}$/.test(id);
      out.saved=Array.isArray(v.saved)?[...new Set(v.saved.filter(valid))].slice(0,500):[];
      if(object(v.notes))for(const [id,n] of Object.entries(v.notes))if(valid(id)&&typeof n==='string')out.notes[id]=n.slice(0,3000);
      if(object(v.experiments))for(const [id,x] of Object.entries(v.experiments))if(valid(id)&&object(x))out.experiments[id]=Object.fromEntries(['question','change','measure','observations','next'].map(k=>[k,typeof x[k]==='string'?x[k].slice(0,3000):'']));
      return out;
    };
    const prior=pub(current.publication), incoming=pub(data.publication);
    const publication={saved:[...new Set([...prior.saved,...incoming.saved])],notes:{...incoming.notes,...prior.notes},experiments:{...incoming.experiments,...prior.experiments}};
    return {saved,notes,projects,exercises,challenges,brief,studio,publication};
  }
  globalThis.ShelfBackup={merge};
})();

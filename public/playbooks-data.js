/* Original, practical playbooks. Examples are fictional and do not imply results. */
globalThis.SHELF_PLAYBOOKS = [
  {
    id:'thoughtful-launch', theme:'Launch', eyebrow:'CAMPAIGN / GET IT OUT THERE', title:'Launch something thoughtfully',
    summary:'Turn a new offer into a clear, manageable three-part launch.',
    outcome:'A one-page launch plan, three content moments, and a final check before you share.',
    time:'60–90 min', audience:'For a new service, product, workshop, or small release.',
    cover:'countdown', accent:'rose', ideas:['countdown','origin-trail','quiet-launch'], guides:['small-launch-plan','write-a-clear-offer'],
    needs:'Your offer, the people it is for, and the practical details you can confirm.',
    steps:[
      {title:'Put the offer in plain words', detail:'Describe what someone gets, who it helps, when it is available, and the actual price or how to find it. If a detail is undecided, mark it as an open question.', prompt:'Could a first-time visitor explain the offer back to you?', task:'Write the offer, audience, availability, and price or pricing process.'},
      {title:'Choose one next step', detail:'Pick the action that matters most: view details, book, reply, or visit. Make sure the destination actually lets someone take that action.', prompt:'What should someone do after they understand the offer?', task:'Choose one next action and check where the link leads.'},
      {title:'Plan three useful moments', detail:'Introduce a real need, show one detail from the making, then share the finished offer. Give the final announcement enough context to stand on its own.', prompt:'What would be useful to know before the offer is announced?', task:'Outline the before, behind-the-scenes, and launch messages.'},
      {title:'Check the handoff', detail:'Confirm availability, dates, prices, links, and who will answer questions. Test the actual path a visitor will use on a phone and desktop when possible.', prompt:'What happens after someone clicks or responds?', task:'Check the details, links, and customer handoff before sharing.'},
      {title:'Choose what you will learn', detail:'Pick a signal related to your goal and a date to review it. Write down questions you receive; do not treat a few responses as representative of everyone.', prompt:'What would help you decide whether to repeat or revise this launch?', task:'Choose one useful signal and a date to review what happened.'}
    ],
    example:'A fictional bakery introduces a weekend pastry box. It shares the flavors, the actual order deadline and price, then tests the order link and notes which questions still come up.',
    checkpoint:'You are ready when the offer, next step, and real availability are clear—even to someone who missed the earlier posts.'
  },
  {
    id:'listen-and-learn', theme:'Audience', eyebrow:'AUDIENCE / ASK BETTER QUESTIONS', title:'Find out what people need',
    summary:'Turn a few thoughtful conversations into one useful improvement.',
    outcome:'A focused question, an observation board, and one small change to test.',
    time:'45–75 min', audience:'For an offer, page, service, or idea you can still change.',
    cover:'question-wall', accent:'butter', ideas:['question-wall','first-five','question-flip'], guides:['listen-before-you-launch'],
    needs:'One decision you can change and people with relevant recent experience.',
    steps:[
      {title:'Choose the decision', detail:'Narrow the work to one decision: what to explain on a page, which question a guide should answer, or which part of a service feels confusing.', prompt:'What will you be able to change based on what you hear?', task:'Write down the decision you are genuinely open to changing.'},
      {title:'Ask about a real moment', detail:'Ask about a recent experience instead of asking people to predict what they might do. Use open questions and give them room to disagree.', prompt:'What was difficult the last time this happened?', task:'Draft two open questions about a recent, relevant experience.'},
      {title:'Notice patterns carefully', detail:'Remove names and identifying details. Group observations by the need underneath them and note how many people mentioned each theme.', prompt:'Which need comes up more than once, and whose perspective is missing?', task:'Group the observations and record the number of people behind each theme.'},
      {title:'Make one small change', detail:'Choose a theme you can act on and improve one explanation, touchpoint, or piece of content. A small sample gives direction, not proof about every customer.', prompt:'What is the smallest useful thing you can change?', task:'Choose one change to make based on the observations.'},
      {title:'Check back', detail:'Ask whether the change made the next step easier to understand. Get permission before sharing anyone’s words or examples.', prompt:'How will you notice whether the change helped?', task:'Decide how you will check the change and protect contributors’ privacy.'}
    ],
    example:'A fictional nail artist hears several first-time clients ask about preparation. They add a short appointment guide and ask future clients whether the instructions are clear.',
    checkpoint:'You have a specific action to take, a record of uncertainty, and permission for anything you intend to share.'
  },
  {
    id:'content-series', theme:'Content', eyebrow:'CONTENT / MAKE IT USEFUL', title:'Build a helpful content series',
    summary:'Make one audience question into three distinct, useful pieces.',
    outcome:'A repeatable series concept and a practical outline for the first three entries.',
    time:'45–60 min', audience:'For a question your audience encounters more than once.',
    cover:'day-diary', accent:'mint', ideas:['make-it-a-series','day-diary','tiny-checklist'], guides:['content-that-helps'],
    needs:'A real question, a format you can maintain, and a little time to outline.',
    steps:[
      {title:'Pick a question with room to grow', detail:'Choose a genuine question with several useful parts. If it is an assumption, label it as one and find a way to check it.', prompt:'What do people ask before, during, and after the experience?', task:'Choose one recurring question and list three parts of the answer.'},
      {title:'Give each piece one job', detail:'Make the first entry explain a starting point, the second show an example, and the third answer a concern or next-step question.', prompt:'How is each entry meaningfully different?', task:'Write the purpose of each of the first three entries.'},
      {title:'Choose a sustainable format', detail:'Use a format you can make again: a photograph and caption, a short video, a simple email, or an illustrated card. Each entry needs enough context to stand alone.', prompt:'What can you realistically produce with what you have?', task:'Choose a format and list the materials for each entry.'},
      {title:'Draft for clarity', detail:'Open with the reader’s question, give a direct answer, and make one useful next step easy to find. Check claims that require expertise or a reliable source.', prompt:'What should the reader understand after this piece?', task:'Draft the first entry with a clear answer and next step.'},
      {title:'Review and improve', detail:'Check whether the details are accurate, the visual is readable, and you have permission to share any customer story or image. Keep questions that could improve the next entry.', prompt:'What still needs verifying before you publish?', task:'Review the first entry for accuracy, readability, and permissions.'}
    ],
    example:'A fictional nail artist creates three first-appointment posts: choosing a service, knowing what happens during the visit, and understanding aftercare.',
    checkpoint:'Each piece answers a different question and remains useful to someone who did not see the rest of the series.'
  },
  {
    id:'recognizable-brand', theme:'Brand', eyebrow:'BRAND / MAKE THE DETAILS MATTER', title:'Make a brand feel recognizable',
    summary:'Translate a few brand words into choices people can actually experience.',
    outcome:'Three brand cues, visible proof for each, and one repeatable touchpoint.',
    time:'45–75 min', audience:'For a business or project with a real audience and touchpoints.',
    cover:'sensory-palette', accent:'pink', ideas:['three-word-brand','sensory-palette','packaging-signature'], guides:['recognizable-brand'],
    needs:'A description of your audience and at least one real customer interaction.',
    steps:[
      {title:'Name the experience', detail:'Choose three words for how you want the experience to feel. Avoid using words only because they sound attractive; they should help make decisions.', prompt:'What would the right person notice or feel?', task:'Choose three words for the experience you want to create.'},
      {title:'Find the proof', detail:'For each word, name a behavior someone can see. “Welcoming” could show up in clear booking instructions or a friendly first message.', prompt:'Where does each word show up in real life?', task:'Write one observable behavior that supports each brand word.'},
      {title:'Select a few cues', detail:'Choose a small set of colors, type styles, images, or words you can repeat. Check contrast and readability rather than relying on color alone.', prompt:'Which details are distinctive, practical, and easy to repeat?', task:'Select repeatable visual and verbal cues and check readability.'},
      {title:'Apply them to one touchpoint', detail:'Choose a real moment—an appointment reminder, product page, package, or thank-you note—and make it clearer and more consistent.', prompt:'Where will a customer actually encounter this detail?', task:'Apply the chosen cues to one real customer touchpoint.'},
      {title:'Make a little reference', detail:'Keep one page showing the words, cues, and an example of the touchpoint. Note what is still an aspiration rather than a current practice.', prompt:'Could a collaborator understand how to repeat the detail?', task:'Document the choices and a real example in a one-page reference.'}
    ],
    example:'A fictional ceramics shop repeats a red star on its care cards and wrapping. Its “thoughtful” promise shows up in clear instructions, not only in decoration.',
    checkpoint:'Each brand word connects to a behavior, and at least one real touchpoint is easier to use.'
  },
  {
    id:'better-booking', theme:'Experience', eyebrow:'EXPERIENCE / MAKE THE NEXT STEP CLEAR', title:'Make booking feel easier',
    summary:'Follow the customer journey and remove a few moments of uncertainty.',
    outcome:'A clearer booking page, confirmation, and useful follow-up.',
    time:'45–60 min', audience:'For an appointment, workshop, consultation, or local service.',
    cover:'welcome-note', accent:'butter', ideas:['welcome-note','service-handoff','friendly-compare'], guides:['write-a-clear-offer','better-customer-handoff'],
    needs:'Your real booking process, service details, and a way to test the path.',
    steps:[
      {title:'Walk through the current path', detail:'Start where a new visitor discovers the service and follow each step until a booking is confirmed. Write down every place you have to guess.', prompt:'Where does a first-time customer hesitate?', task:'Walk through the booking path and note any unclear steps.'},
      {title:'Answer the decision questions', detail:'Explain what is included, timing, location or service area, pricing or the pricing process, and how to ask for help. Be accurate about availability.', prompt:'What does someone need to know before saying yes?', task:'Add the practical details needed to choose and book.'},
      {title:'Make the action obvious', detail:'Use a specific button label and check that it leads to the expected destination. Remove competing calls to action if they obscure the main step.', prompt:'Can a visitor tell exactly what happens when they click?', task:'Clarify the booking action and test its destination.'},
      {title:'Improve the confirmation', detail:'Explain what happens next, any preparation, and how to reschedule or ask a question. Only promise support you can actually provide.', prompt:'What will the customer need immediately after booking?', task:'Write a clear confirmation with next steps and a contact route.'},
      {title:'Check the goodbye', detail:'Prepare a short, relevant follow-up or care note. Test it with someone unfamiliar with the service and revise any confusing instructions.', prompt:'What should the customer know when the service is complete?', task:'Create a concise follow-up or aftercare note and check its clarity.'}
    ],
    example:'A fictional traveling nail artist explains the service area, appointment duration, starting price, and request process, then sends a brief confirmation with preparation notes.',
    checkpoint:'A first-time customer can understand the offer, take the next step, and know what happens after booking.'
  },
  {
    id:'neighbor-collaboration', theme:'Community', eyebrow:'COMMUNITY / MAKE SOMETHING TOGETHER', title:'Plan a thoughtful collaboration',
    summary:'Design a small partnership that is useful to both communities.',
    outcome:'A specific collaboration idea, shared responsibilities, and a simple follow-up plan.',
    time:'45–60 min', audience:'For two businesses, creators, or community organizations with a shared audience.',
    cover:'neighborhood-collab', accent:'mint', ideas:['neighborhood-collab','community-map','love-letter'], guides:['listen-before-you-launch','measure-and-learn'],
    needs:'A potential partner and a genuinely useful idea for both audiences.',
    steps:[
      {title:'Find the overlap', detail:'Identify a partner serving people with a related need, without assuming they want the same outcome as you. Look for a reason the collaboration makes sense.', prompt:'What would both communities find useful?', task:'Describe the shared audience and the value for each community.'},
      {title:'Make the idea small', detail:'Propose one useful exchange: a joint guide, a small event, a demonstration, or another manageable activity. Define what is included and what is not.', prompt:'What can both of you realistically make together?', task:'Outline one manageable collaboration and its intended result.'},
      {title:'Agree on the details', detail:'Discuss responsibilities, timing, costs if any, approvals, and how each party can opt out. Ask permission before using names, photographs, or quotes.', prompt:'Who is responsible for each part and what needs approval?', task:'Agree on roles, timing, costs, and permissions with the partner.'},
      {title:'Make the audience’s next step clear', detail:'Explain why the collaboration is useful and provide a relevant next step. Make sure both sides approve the final details.', prompt:'What will someone be able to do or learn?', task:'Prepare the shared message and check the audience’s next step.'},
      {title:'Follow up and learn', detail:'After the activity, compare what you observed and thank your partner. Keep any results in context and avoid presenting a small response as a guarantee.', prompt:'What did each partner learn and what would you change?', task:'Record the learning and follow up with your partner.'}
    ],
    example:'A fictional florist and baker make a small celebration guide. They agree who supplies the photos, check details together, and each shares the finished guide with their audience.',
    checkpoint:'The collaboration has a useful purpose, agreed responsibilities, and permission for anything shared.'
  },
  {
    id:'creative-reset', theme:'Creative reset', eyebrow:'CREATIVE / A FRESH WAY IN', title:'Get unstuck in one session',
    summary:'Use a few friendly constraints to turn a blank page into a workable direction.',
    outcome:'Three rough approaches and one clear next action.',
    time:'30–45 min', audience:'For a post, campaign, visual, or story that is not coming together.',
    cover:'creative-recipe', accent:'rose', ideas:['creative-recipe','object-interview','color-constraint'], guides:['creative-reset'],
    needs:'One real objective, paper or a blank document, and a short block of time.',
    steps:[
      {title:'Make the problem smaller', detail:'Write one thing the work needs to do for a particular person. Replace a broad goal such as “make it exciting” with a useful audience outcome.', prompt:'What should someone understand or be able to do?', task:'Write the audience and one job the idea needs to do.'},
      {title:'Choose a helpful constraint', detail:'Pick a format and one limit, such as one photograph, three colors, or twenty minutes. Remove the limit if it makes the message less clear or accessible.', prompt:'Which boundary makes it easier to start?', task:'Choose one format and one practical creative constraint.'},
      {title:'Sketch three different approaches', detail:'Try a question, a story, and a demonstration—or three other meaningfully different directions. Keep them rough until all three exist.', prompt:'How could you explain the same idea three different ways?', task:'Sketch three distinct approaches without polishing the first.'},
      {title:'Choose for clarity', detail:'Pick the approach that best serves the audience and objective. Ask someone what they think the message means and what they would do next.', prompt:'Which version is easiest to understand?', task:'Choose one direction and get a clarity check if possible.'},
      {title:'Define the next action', detail:'Write one small production step and save the unused sketches for later. A discarded direction might fit another project.', prompt:'What can you complete next without waiting for a perfect idea?', task:'Record the next small action and keep the unused directions.'}
    ],
    example:'A fictional bakery sketches a close-up detail, a serving tip, and a short origin story using one pastry and one window, then develops the clearest option.',
    checkpoint:'You have one direction to develop and a next action small enough to start.'
  },
  {
    id:'learn-after-launch', theme:'Learning', eyebrow:'LEARNING / TURN ACTION INTO INSIGHT', title:'Learn from what you shared',
    summary:'Review a small campaign without getting lost in numbers.',
    outcome:'A short learning note with an observation, context, and next decision.',
    time:'30–45 min', audience:'For a post, launch, event, guide, or small creative experiment.',
    cover:'tiny-checklist', accent:'pink', ideas:['tiny-checklist','audience-choice','myth-reality'], guides:['measure-and-learn'],
    needs:'Your original goal, a record of what was shared, and one or two relevant signals.',
    steps:[
      {title:'Return to the question', detail:'Write what you wanted to learn or what action you hoped to make easier. If you did not set a question in advance, say that and choose a useful one now.', prompt:'What decision are you trying to make next?', task:'Write the original goal and the next decision you need to make.'},
      {title:'Choose relevant evidence', detail:'A view count can show exposure but not understanding. An actual inquiry, a completed action, or a specific question may be closer to your goal.', prompt:'Which available signal is closest to the action you care about?', task:'Record one or two signals that relate to the goal.'},
      {title:'Add context', detail:'Note the date, audience, channel, and anything that changed. A small sample can suggest where to investigate; it cannot prove why something happened.', prompt:'What context might affect how you interpret the signal?', task:'Record the date, channel, audience, and important limitations.'},
      {title:'Write the observation', detail:'Separate what you saw from what you think it might mean. Include questions or feedback only when you have permission and remove private details.', prompt:'What happened, and what remains uncertain?', task:'Write one observation and one uncertainty in plain language.'},
      {title:'Choose the next move', detail:'Decide whether to repeat, revise, ask another question, or stop. Write the next action and when you will review it.', prompt:'What will you do differently, if anything?', task:'Choose the next action and set a review point.'}
    ],
    example:'A fictional workshop host reviews the questions received after sharing a booking guide. They notice several requests for location details and decide to make the directions easier to find.',
    checkpoint:'Your note separates evidence from assumptions and ends with a concrete next decision.'
  }
];

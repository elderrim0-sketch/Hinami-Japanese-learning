/* Hanami V3 · plain-language teaching guide. Original explanations, inspired by the sentence-train teaching metaphor. */
(()=>{
'use strict';
const C=window.HANAMI_CURRICULUM;if(!C)return;
const notes={
'n5-01':['Treat greetings like opening a door. こんにちは opens a daytime conversation. はじめまして is for the very first time you meet.','Picture Hana waving across the village path. You do not need a giant sentence to say hello.'],
'n5-02':['Japanese lets the conversation do some work for you. Once everyone knows who you mean, you can often leave “I” or “you” unsaid.','Think: “(I) am a traveller.” 旅人です。 The “I” is understood from the situation.'],
'n5-03':['は (said “wa” here) puts a spotlight on the topic: “As for this...” が marks the subject inside a statement. They are not just interchangeable stickers.','Picture a station sign marked は: it announces what we are talking about. The train itself connects the subject with what happens.'],
'n5-04':['Distance is the only trick: これ near me, それ near you, あれ far from both of us.','Put three objects on a table: my cup, your cup, the cup across the room.'],
'n5-05':['To turn a polite statement into a yes/no question, you can put か at the end.','It is like adding a question bell after the whole sentence, not rearranging every word.'],
'n5-06':['の is a little bridge between two nouns. The first noun tells you which kind, which person, or whose second noun it is.','花の本 = Hana’s book. Imagine a tag tied between the owner and the thing.'],
'n5-07':['Think “exists” for ある and “is here” for living creatures with いる. に can pin the location on a map.','You are looking for the cat: 庭に猫がいる = In the garden, a cat is there.'],
'n5-08':['A verb is your sentence train’s engine. を points to what the action happens to. パンを食べます = eat bread.','The bread is the cargo, を is its label, and 食べます is the engine doing the eating. Who eats can be understood from context.'],
'n5-09':['に marks a destination or point; へ points the direction; で marks where an action takes place.','Imagine a village map: arrow toward the shrine (へ), arrive at the shrine (に), study at the shrine (で).'],
'n5-10':['An adjective paints a picture. い adjectives can attach directly to a noun, and な adjectives take な before a noun.','Think of color swatches: 大きい家 = big house; 静かな森 = quiet forest.'],
'n4-01':['The て form is the sentence equivalent of holding hands: one action can connect to what comes next.','Open the door → enter the room. Do one, then the next. Japanese has a handy joining form.'],
'n4-02':['ている takes a verb and shows an action unfolding now, or a state that resulted from an action.','Like a video versus a photo: 読んでいる is the video of reading, while some verbs describe the photo-like result.'],
'n4-03':['ない switches a plain verb to “not”. Start with the action; change its ending to say it does not happen.','Imagine a trail sign: 行く = go, 行かない = do not go. Different verb families change differently.'],
'n4-04':['た is your “already happened” stamp for plain past events.','Place a footprint behind the traveller: 行った = went. Watch the verb family when you change endings.'],
'n4-05':['たことがある means “this has happened in my life before.” It is your experience badge, not a diary date.','A souvenir from Kyoto says you have been there; it does not tell us exactly when.'],
'n4-06':['ほうがいい is advice: “that option would be better.” Think of choosing between two paths.','The safer path is to take a lantern. You advise, not command.'],
'n4-07':['つもり describes an intention: what you have decided you plan to do.','It is the “my plan is...” note pinned to tomorrow’s calendar.'],
'n4-08':['ので explains why. It hands the listener a reason before the result.','Rain → cancelled picnic. The first half is the reason; the second half is what happened.'],
'n3-01':['ようになる is for change over time. Before: could not do it. Now: can do it.','Your character could not read signs at the beginning; now the signs make sense.'],
'n3-02':['ば is a “when this condition holds, that result follows” bridge.','Think of a gate with a switch: press it → gate opens. Some other Japanese “ifs” have different uses.'],
'n3-03':['のに says reality surprised you: “even though X... Y happened.”','You trained hard, yet lost. The second result does not match what you expected.'],
'n3-04':['らしい can mean “apparently” based on clues or reports, or “typical of” in a different pattern.','You hear rumours at the market. Do not report them as something you saw yourself.'],
'n3-05':['ために tells us the purpose behind an action: “in order to...”','Carry a lantern in order to see the path. The goal comes first in your head.'],
'n3-06':['ことにする is the “I decide” button. ことになる often means it has been decided or arranged.','Choosing to join the guild is your own decision—not a rule handed down to you.'],
'n3-07':['はず says the evidence makes you expect something to be true.','The package was marked delivered, so it should be here. You have reasons, not a guarantee.'],
'n3-08':['そうだ can describe what something looks likely to do, based on appearance.','Black clouds? 降りそう = looks like rain. This appearance form differs from the hearsay form.'],
'n2-01':['わけではない says “that conclusion is too strong.” You are correcting the bigger claim.','“I like coffee” does not mean “I dislike tea.” It is not that simple.'],
'n2-02':['ものの says “yes, that is true... but here is the complication.” It sounds rather formal.','A bridge was repaired, but it still cannot carry the heavy cart.'],
'n2-03':['によって is a switch that can mean “depending on”, “by means of”, or “by”. Let the rest of the sentence tell you which.','Each village has different rules: the answer changes depending on the place.'],
'n2-04':['に限らず throws open a boundary: “not only this group.”','The library is for villagers—and not limited to villagers.'],
'n2-05':['に応じて means you adapt your response to the situation or request.','Bring blankets for cold travellers and water for thirsty ones. You adjust to the need.'],
'n2-06':['ざるを得ない means the situation corners you: you have no reasonable choice but to act.','The only bridge has fallen; you must take the mountain route, even if you do not want to.'],
'n2-07':['に違いない expresses a very strong guess based on what you know.','All the clues point to one answer; you feel very sure, though it is still a conclusion.'],
'n1-01':['に至る is formal “arrives at / leads to” for a process or result.','Many small discussions eventually reach one big decision.'],
'n1-02':['かたわら describes an ongoing role alongside another long-running role.','You are a scholar, and alongside that life you teach children after school.'],
'n1-03':['を皮切りに says “this was the first spark in a whole series.”','A festival starts in one town and then spreads from town to town.'],
'n1-04':['ないまでも says “even if we cannot reach the biggest goal, we still reach a smaller one.”','You may not master every page, but you can understand the story’s main idea.'],
'n1-05':['べく is a formal way to say “with the aim of doing.” It is about purpose, not obligation.','A knight leaves at dawn with one mission: to find the lost scroll.'],
'n1-06':['に即して means stay grounded in a rule, fact, or principle.','Judge the case by the rulebook, not your mood.'],
'n1-07':['といえども means “even someone/something of this kind.” It carries a literary or formal feel.','Even the guardian of the archive must follow the law.']
};
C.lessons.forEach(l=>{const a=notes[l.id];if(a){l.simple=a[0];l.picture=a[1]}else{l.simple=l.explain;l.picture=l.hook}});
})();

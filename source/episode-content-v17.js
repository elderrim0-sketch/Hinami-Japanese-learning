/* Hanami V17 - original scripted audio-drama content. Japanese lines use the browser voice engine unless a matched licensed recording is installed. */
(function(){
const make=(id,level,genre,title,subtitle,location,tips,qs,script)=>({id,level,genre,title,subtitle,location,tips,questions:qs.map(v=>({question:v[0],options:v[1],answer:v[2],why:v[3]})),lines:script.trim().split('\n').map(s=>{const [speaker,ja,en]=s.split('|');return {speaker,ja,en}})});
window.HANAMI_EPISODES_V17=[
make('ep-market-01','N5','Everyday','The last train home','A shopping trip becomes a little adventure.','market',['time','requests'],[
 ['Why does Hana want to hurry?',['The train leaves soon','The shop is closing forever','It is raining'],0,'もうすぐ電車が来る means the train is arriving soon.'],
 ['What does Yuki ask Hana to buy?',['Bread','Two apples','An umbrella'],1,'りんごを二つ買って refers to two apples.']],`
はな|ゆき、今何時？|Yuki, what time is it?
ゆき|五時半だよ。|It is five thirty.
はな|もうすぐ電車が来るね。|Our train is arriving soon.
ゆき|そうだね。でも、少しお腹がすいた。|Right, but I am a bit hungry.
はな|あそこに小さい店があるよ。|There is a small shop over there.
ゆき|本当だ。パンを買おう。|You're right. Let's buy bread.
店員|いらっしゃいませ。|Welcome!
はな|このパンはいくらですか。|How much is this bread?
店員|二百円です。|Two hundred yen.
ゆき|りんごもあるね。|There are apples too.
ゆき|はな、りんごを二つ買って。|Hana, buy two apples.
はな|いいよ。全部でいくらですか。|Sure. How much is everything?
店員|五百円です。|Five hundred yen.
はな|はい、どうぞ。|Here you go.
ゆき|あっ、電車の音が聞こえる！|Oh, I can hear the train!
はな|急いで！|Hurry!`),
make('ep-home-02','N5','Everyday','An unexpected guest','Simple requests, polite questions and a small surprise.','village',['particles','requests'],[
 ['Who is coming over?',['A teacher','Sora','The mayor'],1,'そらが来る uses が to introduce Sora as the arriving person.'],
 ['What does Hana need?',['More tea','A new table','A ticket'],0,'お茶が足りない means there is not enough tea.']],`
はな|今日は家で勉強するよ。|Today I will study at home.
ゆき|私も行っていい？|Can I come too?
はな|もちろん。いっしょに勉強しよう。|Of course. Let's study together.
ゆき|ありがとう。何時に行けばいい？|Thanks. What time should I come?
はな|三時はどう？|How about three?
ゆき|うん、いいよ。|Yes, that's fine.
はな|あっ、そらからメールだ。|Oh, a message from Sora.
ゆき|何て書いてある？|What does it say?
はな|そらも来るって。|It says Sora is coming too.
ゆき|じゃあ、三人だね。|So there will be three of us.
はな|お茶が足りないかも。|We might not have enough tea.
ゆき|私が買ってくるよ。|I'll go buy some.
はな|助かる！|That helps!
ゆき|どんなお茶が好き？|What kind of tea do you like?
はな|温かい緑茶が好き。|I like warm green tea.
ゆき|分かった。またあとで！|Got it. See you later!`),
make('ep-travel-03','N4','Everyday','The wrong platform','Train changes, instructions and decisions.','market',['conditions','requests'],[
 ['Why must they change platforms?',['The train was cancelled','Their platform has changed','A friend called'],1,'ホームが変わりました means the platform changed.'],
 ['What will they do if they hurry?',['Make the train','Get a refund','Find lunch'],0,'急げば間に合う uses the -ば condition.']],`
駅員|お客様にお知らせします。|An announcement to passengers.
駅員|七番線の電車は、八番線に変更になりました。|The train on platform seven has moved to platform eight.
そら|えっ、今何て言った？|Wait, what did they say?
はな|ホームが変わったんだって。|They said the platform changed.
そら|でも、出発まで五分しかないよ。|But only five minutes until departure.
はな|急げば間に合うと思う。|I think we'll make it if we hurry.
そら|荷物、持とうか？|Want me to carry your bag?
はな|ありがとう。お願い。|Thank you. Please do.
駅員|階段を上がって、右へ進んでください。|Go up the stairs and proceed right.
そら|ここを右だね。|Right here, then.
はな|あっ、八番線が見えた！|I can see platform eight!
そら|よかった。まだ電車がいる。|Great, the train is still here.
はな|走らなくてもよかったかも。|Maybe we didn't need to run.
そら|いや、急いで正解だったよ。|No, rushing was the right call.
はな|じゃあ、座って休もう。|Let's sit down and rest.
そら|次はちゃんとアナウンスを聞こうね。|Next time let's listen carefully to the announcement.`),
make('ep-snow-04','N4','Everyday','A snow-day promise','Promises, plans and why things changed.','mountain',['reasons','conditions'],[
 ['Why did the trip change?',['Heavy snow','Missing tickets','Work obligations'],0,'雪がひどくなったので explains the reason.'],
 ['What does Yuki promise?',['To study','To go next weekend','To call the teacher'],1,'来週末に行こうって約束 uses a promise about next weekend.']],`
ゆき|明日、山に行けるかな。|I wonder whether we can go to the mountain tomorrow.
はな|天気予報を見た？|Did you check the forecast?
ゆき|まだ見ていない。|Not yet.
はな|雪がたくさん降るらしいよ。|Apparently it'll snow a lot.
ゆき|ええ、楽しみにしていたのに。|Oh no, I was looking forward to it.
はな|危なかったら行かないほうがいいね。|If it's dangerous, we shouldn't go.
ゆき|じゃあ、家で映画を見る？|Then shall we watch a movie at home?
はな|うん。何が見たい？|Sure. What do you want to watch?
ゆき|冒険の映画がいいな。|An adventure film would be nice.
はな|じゃあ、食べ物を用意しておくね。|I'll prepare some food ahead of time.
ゆき|私も飲み物を持っていくよ。|I'll bring drinks too.
はな|助かる。|That'll help.
ゆき|山は来週末に行こうって約束だよ。|Promise we'll go to the mountain next weekend.
はな|約束。天気がよかったらね。|Promise, if the weather is good.
ゆき|今度こそ晴れてほしいな。|I hope it'll be sunny next time.
はな|きっと大丈夫だよ。|I'm sure it'll be okay.`),
make('ep-library-05','N3','Mystery','The library after closing','Clues, hearsay and mistaken assumptions.','archive',['inference','contractions'],[
 ['What makes the librarian suspicious?',['A missing book and light','A broken window only','A new assistant'],0,'本が一冊なくなっている and 明かりがついていた are the clues.'],
 ['What was the actual explanation?',['Someone stole the book','A researcher was working','A ghost appeared'],1,'研究者が資料を調べていただけ explains the innocent situation.']],`
司書|昨日、閉館後に明かりがついていたんです。|Yesterday after closing, the lights were on.
はな|誰か残っていたんでしょうか。|I wonder if somebody stayed behind.
司書|それに、本が一冊なくなっているんです。|Also, one book is missing.
そら|泥棒が入ったのかもしれない。|A thief might have broken in.
はな|まだ決めつけないほうがいいよ。|We shouldn't jump to conclusions yet.
そら|でも、鍵はかかっていたんだろ？|But the doors were locked, right?
司書|ええ、確かに。|Yes, certainly.
はな|昨日の記録を見せてもらえますか。|May I see yesterday's records?
司書|もちろんです。|Of course.
そら|この名前、見たことある。|I've seen this name before.
はな|研究者の人みたいだね。|It seems to be a researcher.
司書|ああ、そうでした。特別な許可を出したんです。|Oh, yes. We gave special permission.
そら|つまり、夜まで資料を調べていたわけか。|So they were examining documents until night.
はな|本も研究室に持っていったのかな。|Perhaps they took the book to the lab.
司書|確認したところ、そのとおりでした。|I checked, and that's exactly right.
そら|早とちりしてごめん。|Sorry for jumping to conclusions.`),
make('ep-work-06','N3','Everyday','The meeting nobody expected','Context, indirect speech and polite disagreement.','market',['politeness','inference'],[
 ['What is the main disagreement about?',['Project timing','Office rent','Who will lead'],0,'予定を早めるかどうか is about moving the schedule earlier.'],
 ['What is the manager’s decision?',['Cancel it','Gather feedback first','Start immediately'],1,'みんなの意見を聞いてから means after collecting opinions.']],`
部長|みなさん、急に集まってもらってすみません。|Thank you for coming on short notice.
部員|何か問題があったのでしょうか。|Has something gone wrong?
部長|プロジェクトの予定を早める案が出ています。|There's a proposal to move the project earlier.
はな|今の予定でも少し厳しいと思います。|I think the current schedule is already tight.
部長|そう感じる理由を聞かせてもらえますか。|Could you explain why you feel that way?
はな|確認しなければならない点がまだ多いからです。|Because there are still many things to verify.
そら|僕も同じ意見です。|I agree.
部員|でも、早く始めたほうがいいという声もあります。|Some also say we should begin sooner.
はな|それなら、作業を分けるのはどうでしょう。|In that case, what about dividing the tasks?
部長|いい提案ですね。|That's a good suggestion.
そら|無理に全部進める必要はないと思います。|I don't think everything needs to be rushed.
部員|重要な部分から始めればよさそうです。|We might start with the important parts.
部長|では、みんなの意見を聞いてから決めましょう。|Let's decide after hearing everyone's views.
はな|そのほうが安心できます。|That feels more reassuring.
そら|話し合ってよかったですね。|I'm glad we discussed it.
部長|ご協力、ありがとうございます。|Thank you for your cooperation.`),
make('ep-forest-07','N2','Fantasy','The pact beneath the gate','Obligation, risk and implied motives.','forest',['obligation','inference'],[
 ['Why does the captain refuse the order?',['It would abandon the villagers','The map is lost','No one has weapons'],0,'見捨てるわけにはいかない expresses a strong moral constraint.'],
 ['What do they decide?',['Leave immediately','Find a safer route','Surrender'],1,'別の道を探して means find an alternative route.']],`
隊長|門が開くまで、ここで待機しろ。|Remain here until the gate opens.
はな|村の人たちはまだ向こう側にいます。|The villagers are still on the other side.
隊長|分かっている。しかし、命令は命令だ。|I know. But orders are orders.
そら|このままでは間に合わないかもしれません。|We might not make it in time.
はな|見捨てるわけにはいきません。|We cannot abandon them.
隊長|それでも全員を危険にさらすわけにはいかない。|But we cannot put everyone at risk either.
そら|別の道を探してみましょう。|Let's look for another route.
隊長|道が残っている保証はないぞ。|There's no guarantee a route remains.
はな|それでも、何もしないよりましです。|Even so, that's better than doing nothing.
隊長|なるほど。では、偵察に出よう。|I see. Let's go scout.
そら|北の森なら、橋が残っている可能性があります。|A bridge may remain in the northern forest.
はな|もし橋が壊れていたら？|What if the bridge is broken?
隊長|その時は引き返す。無理はしない。|Then we turn back. We won't take needless risks.
そら|了解です。|Understood.
はな|必ずみんなで帰りましょう。|Let's make sure we all return together.
隊長|ああ。誰一人置いていかない。|Yes. We won't leave anyone behind.`),
make('ep-headlines-08','N2','Everyday','A headline that changed everything','Careful claims, evidence and formal Japanese.','market',['evidence','contrast'],[
 ['What is the editor concerned about?',['A misleading claim','A spelling error','A late train'],0,'誤解を招きかねない is a risk of misunderstanding.'],
 ['What action is agreed upon?',['Publish without change','Check the sources again','Delete the story'],1,'資料を確認し直す means rechecking sources.']],`
編集長|この見出しの表現、少し強すぎないか。|Isn't this headline worded too strongly?
記者|数字に基づいて書いたつもりです。|I intended it to be based on figures.
編集長|数字が正しくても、結論まで正しいとは限らない。|Even if the figures are right, the conclusion may not be.
記者|確かに、別の要因も考えられます。|True, other factors might explain it.
編集長|これでは読者の誤解を招きかねない。|This could mislead readers.
記者|もう少し慎重な言い方にします。|I'll use more cautious wording.
編集長|それに、この資料は去年のものだろう。|Also, isn't this document from last year?
記者|はい。ただ、状況は似ていると思います。|Yes, but I think the conditions are similar.
編集長|似ているというだけで使っていいわけではない。|Similarity alone doesn't justify using it.
記者|では、最新の資料を確認し直します。|Then I'll recheck the latest sources.
編集長|それがいい。根拠を明確にしてくれ。|Good. Make the basis clear.
記者|承知しました。|Understood.
編集長|批判するにしても、事実に忠実であるべきだ。|Even criticism must stay faithful to facts.
記者|読者に誤った印象を与えないようにします。|I'll avoid giving readers a false impression.
編集長|頼んだよ。|I'm counting on you.
記者|はい、修正して提出します。|Yes, I'll revise and submit it.`),
make('ep-council-09','N1','Fantasy','The council of seven','Subtle concessions in a political fantasy.','archive',['concessions','inference'],[
 ['What is Hana arguing?',['Cooperation still matters despite failure','The treaty is perfect','The council must disband'],0,'合意に至らなかったとはいえ signals a concession.'],
 ['What ultimately happens?',['Dialogue continues','War is declared','The vote is cancelled permanently'],0,'協議を続けることにします is the final decision.']],`
議長|本日の協議は、予定より長引いております。|Today's discussion has run longer than planned.
大臣|合意に至らなかった以上、交渉を打ち切るべきです。|Since we failed to agree, we should end talks.
はな|合意に至らなかったとはいえ、対話の意義は失われていません。|Even without agreement, dialogue still has value.
大臣|理想論にすぎないのではありませんか。|Isn't that mere idealism?
はな|現実を踏まえたうえで申し上げています。|I'm speaking with the realities in mind.
議長|具体的には、どう進めるお考えですか。|How exactly do you propose we proceed?
はな|各国の事情を整理し、共通点から確認するべきです。|We should clarify each country's situation and start with common ground.
大臣|しかし、それでは時間がかかりすぎます。|But that would take too long.
はな|急ぐあまり、信頼を損なっては元も子もありません。|If haste destroys trust, we gain nothing.
議長|一理ありますな。|There's merit in that.
大臣|とはいえ、期限を無視するわけにもいきません。|Even so, we cannot ignore the deadline.
はな|期限は守りつつ、段階的な合意を目指してはどうでしょう。|How about seeking phased agreements while meeting the deadline?
議長|双方の主張を考慮した案ですね。|That considers both sides.
大臣|完全には納得しかねますが、検討の余地はあります。|I'm not entirely convinced, but there's room to consider it.
はな|ありがとうございます。|Thank you.
議長|では、協議を続けることにします。|Then we'll continue deliberations.`),
make('ep-evidence-10','N1','Mystery','The testimony and the truth','Evidence, inference and reliability.','archive',['evidence','contrast'],[
 ['What does the detective say about the witness?',['The account is useful but not conclusive','The witness lied','The witness is missing'],0,'証言は重要ですが、それだけで断定するには不十分 says one testimony is insufficient.'],
 ['What next step is chosen?',['Verify records and timelines','Arrest everyone','Destroy the evidence'],0,'記録と照合し、時間の流れを確認する means verify records and timeline.']],`
刑事|証人の話には、確かに一致する点があります。|The witness's account does contain matching details.
助手|ならば、犯人は確定したのでしょうか。|Then has the culprit been established?
刑事|いや、証言は重要ですが、それだけで断定するには不十分です。|No. The testimony matters, but alone is insufficient.
助手|どの部分が気になりますか。|Which part concerns you?
刑事|時刻の説明が、ほかの記録と食い違っています。|The stated times contradict other records.
助手|記憶違いの可能性もあるということですか。|Could it be a memory error?
刑事|その可能性は否定できません。|We cannot rule that out.
助手|ただ、わざと事実を隠しているとも考えられます。|Still, they might be hiding facts deliberately.
刑事|だからといって、決めつけるべきではありません。|That doesn't mean we should jump to conclusions.
助手|では、どう調べましょう。|Then how should we investigate?
刑事|記録と照合し、時間の流れを確認しましょう。|Let's check the records and verify the timeline.
助手|それによって説明の矛盾が見えるかもしれません。|That may reveal contradictions.
刑事|証拠を積み重ねて初めて、結論に近づけます。|Only by accumulating evidence can we approach a conclusion.
助手|分かりました。推測と事実を分けて考えます。|Understood. I'll separate speculation from fact.
刑事|それが何より大切です。|That is more important than anything.
助手|さっそく記録を取りに行きます。|I'll fetch the records right away.`)
];
window.HANAMI_SPEECH_CLINICS_V17=[
 {id:'short-iru',name:'Drop the い',formal:'何をしているの？',natural:'何してるの？',why:'Spoken Japanese often shortens している to してる, and leaves out を when the meaning is clear.',focus:'contractions'},
 {id:'short-nnda',name:'The explanatory んだ',formal:'何をしているのですか。',natural:'何してんの？',why:'しているの becomes してん in casual speech. The の adds an explanatory/questioning tone.',focus:'contractions'},
 {id:'short-teoku',name:'Get it ready',formal:'準備しておきます。',natural:'準備しとく。',why:'しておく often shortens to しとく; the preparation meaning stays.',focus:'contractions'},
 {id:'short-dewa',name:'Well then…',formal:'それでは、行きましょう。',natural:'じゃ、行こう。',why:'では becomes じゃ; polite 行きましょう becomes casual 行こう.',focus:'register'},
 {id:'short-wakaranai',name:'I dunno',formal:'分かりません。',natural:'分かんない。',why:'Colloquial 分かんない is common in speech, but not appropriate in formal writing.',focus:'register'},
 {id:'topic',name:'Who did what?',formal:'私は今日学校に行きました。',natural:'今日、学校行った。',why:'Pronouns, topics and particles may be left unsaid when context makes them obvious.',focus:'omission'},
 {id:'dayo',name:'Feel the ending',formal:'それは本当です。',natural:'本当だよ。',why:'よ adds information or emphasis; ね seeks agreement. Endings carry attitude.',focus:'endings'},
 {id:'jan',name:'You know, right?',formal:'それはいいではありませんか。',natural:'それ、いいじゃん。',why:'じゃん expresses an informal, shared or obvious point; avoid it in formal contexts.',focus:'endings'},
 {id:'ore',name:'Character voice',formal:'私は行きます。',natural:'俺が行く。',why:'俺 can sound rough or familiar; characters use pronouns to express personality.',focus:'character-voice'},
 {id:'kashira',name:'Character voice 2',formal:'どうしたのでしょう。',natural:'どうしたのかしら。',why:'かしら can sound feminine or stylized depending on character and setting.',focus:'character-voice'},
 {id:'nanka',name:'Vague feelings',formal:'何か気になります。',natural:'なんか気になる。',why:'なんか softens or makes feelings vague, often without a direct dictionary translation.',focus:'inference'},
 {id:'tte',name:'Quoting what you heard',formal:'彼は来ないと言いました。',natural:'来ないって。',why:'って can stand in for quoted speech, especially when the speaker is understood.',focus:'reported-speech'},
 {id:'naiwake',name:'Not impossible',formal:'不可能とは言えません。',natural:'できないわけじゃない。',why:'Double negatives often hedge a claim: not that it is impossible.',focus:'inference'},
 {id:'rasii',name:'Rumor vs certainty',formal:'雨が降るそうです。',natural:'雨らしいよ。',why:'らしい can convey reported information or inference—not personal eyewitness certainty.',focus:'reported-speech'},
 {id:'yabai',name:'Emotion changes meaning',formal:'大変な状況です。',natural:'やばい！',why:'やばい ranges from bad/dangerous to amazing, depending on tone and context.',focus:'slang'},
 {id:'majide',name:'Seriously?',formal:'本当ですか。',natural:'マジで？',why:'マジで is highly casual. The pitch and facial expression can imply surprise or disbelief.',focus:'slang'}
];
})();

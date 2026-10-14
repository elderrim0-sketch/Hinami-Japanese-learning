/* 30 authored chapter narratives; reading and audio-first comprehension share these texts.
   Question choices are individually written, not randomly selected generic definitions. */
(()=>{'use strict';
const readings=[
{
 jp:'わたしは花です。学生です。ここは小さい町です。あの人は先生です。今日は日曜日です。',en:'I am Hana. I am a student. This is a small town. That person is a teacher. Today is Sunday.',q:[['What is Hana?',['A teacher','A student','A doctor'],1],['What day is it?',['Sunday','Monday','Friday'],0]]
},
{
 jp:'庭に白い猫がいます。猫の名前は雪です。花はパンを食べます。雪は水を飲みます。あの本は花の本です。',en:'There is a white cat in the garden. The cat is named Yuki. Hana eats bread. Yuki drinks water. That book is Hana’s.',q:[['Who drinks water?',['Hana','The teacher','Yuki the cat'],2],['Who owns the book?',['Hana','The cat','Nobody knows'],0]]
},
{
 jp:'花は駅へ行きます。「駅はどこですか」と聞きます。男の人は「この道です」と言います。「何時ですか」「九時です」。',en:'Hana is going to the station. She asks where it is. A man says to follow this road. She also asks the time; it is nine o’clock.',q:[['What is Hana looking for?',['A school','A station','A museum'],1],['What time is it?',['Eight','Ten','Nine'],2]]
},
{
 jp:'花は毎朝七時に起きます。今日は八時に起きました。朝ごはんを食べませんでした。急いで学校へ行きました。',en:'Hana usually gets up at seven each morning. Today she got up at eight. She did not eat breakfast and hurried to school.',q:[['When does Hana usually wake up?',['Seven','Eight','Six'],0],['Did she eat breakfast today?',['Yes','No','The text does not say'],1]]
},
{
 jp:'学校の前に公園があります。公園に犬が二匹います。花は学校で日本語を勉強します。勉強のあとで公園へ行きます。',en:'There is a park in front of the school. There are two dogs in it. Hana studies Japanese at school and goes to the park afterward.',q:[['Where does Hana study?',['In the park','At school','At home'],1],['What is in the park?',['Two dogs','Two cats','Three birds'],0]]
},
{
 jp:'今日は暑いです。でも、図書館は涼しいです。図書館は静かな場所です。花はおもしろい本を読みます。昨日は寒かったです。',en:'It is hot today, but the library is cool. The library is a quiet place. Hana reads an interesting book. Yesterday it was cold.',q:[['How is the library?',['Loud and hot','Quiet and cool','Expensive'],1],['How was yesterday?',['Cold','Hot','Rainy'],0]]
},
{
 jp:'花は友達と市場へ行きます。りんごやみかんを買います。水も買います。全部で千円ぐらいです。市場は朝九時から開いています。',en:'Hana goes to the market with a friend. She buys apples, mandarins and water. Everything costs about a thousand yen. The market is open from nine in the morning.',q:[['About how much does Hana spend?',['500 yen','1,000 yen','10,000 yen'],1],['Who goes with Hana?',['Her friend','Her father','Her teacher'],0]]
},
{
 jp:'「ここに座ってもいいですか」「はい、どうぞ」。花は席に座って、本を読んでいます。先生は「ここで電話を使ってはいけません」と言います。',en:'“May I sit here?” “Yes, please.” Hana sits and reads a book. The teacher says that using a phone here is not allowed.',q:[['What is Hana doing?',['Reading','Cooking','Sleeping'],0],['What is not allowed?',['Reading','Sitting','Using a phone'],2]]
},
{
 jp:'昨日、花は家で映画を見た。友達と電話で話した。それから、少し本を読んだ。今日は出かけないつもりだ。家で休む。',en:'Yesterday Hana watched a movie at home, talked with a friend on the phone, then read a little. Today she intends to stay home and rest.',q:[['What is Hana planning today?',['To travel','To rest at home','To go shopping'],1],['Did she watch a movie yesterday?',['Yes','No','Maybe'],0]]
},
{
 jp:'「いっしょにお茶を飲みませんか」「いいですね。行きましょう」。花は喫茶店に行きたいです。でも、今日は雨ですから、近い店にします。',en:'“Would you like to have tea together?” “Sounds good. Let’s go.” Hana wants to visit a café, but because it is raining today, they choose a nearby one.',q:[['Why do they choose a nearby café?',['It is raining','They are late','They have no money'],0],['What is the invitation?',['To study','To drink tea','To run'],1]]
},
{
 jp:'花は電車とバスを比べます。電車はバスより速いです。でも、バスのほうが安いです。時間がないときは電車で行きます。',en:'Hana compares the train and bus. The train is faster, but the bus is cheaper. When she has little time, she takes the train.',q:[['Which is faster?',['The bus','They are the same','The train'],2],['Which is cheaper?',['The bus','The train','Neither'],0]]
},
{
 jp:'花は去年京都に行ったことがあります。京都に行く前に日本語を勉強しました。旅行から帰ったあとで、友達に写真を見せました。来年も行けたらうれしいです。',en:'Hana has visited Kyoto. She studied Japanese before going there and showed her photos to friends after coming back. She would be happy if she could go again next year.',q:[['Has Hana been to Kyoto?',['Yes','No','Not stated'],0],['What did she do after returning?',['Bought a train','Showed photos','Moved home'],1]]
},
{
 jp:'花はりんごを三つ買いました。友達はみかんを二つ買いました。切符は二枚あります。二人は電車で海へ行きます。',en:'Hana bought three apples and her friend bought two mandarins. They have two tickets and are travelling to the sea by train.',q:[['How many tickets do they have?',['One','Two','Three'],1],['How many apples did Hana buy?',['Three','Two','Five'],0]]
},
{
 jp:'花は毎朝手紙を書きます。今日は母に電話をしました。母はもう家に帰りました。花は帰ってから、ご飯を作りました。',en:'Hana writes a letter every morning. Today she phoned her mother, who had already returned home. Hana cooked after she got back.',q:[['Whom did Hana telephone?',['Her mother','Her friend','Her teacher'],0],['When did Hana cook?',['Before returning','After returning','While on the train'],1]]
},
{
 jp:'花は日本語が好きです。漢字はまだ難しいです。でも、毎日少しずつ勉強しています。新しい辞書が欲しいです。',en:'Hana likes Japanese. Kanji are still difficult, but she studies little by little every day. She wants a new dictionary.',q:[['What does Hana want?',['A new dictionary','A new bike','A new phone'],0],['Does Hana find kanji easy?',['Yes','No','The text says nothing'],1]]
},
{
 jp:'花は「明日は晴れると思います」と言いました。でも、ニュースでは雨が降るかもしれないそうです。友達は「傘を持って行ったほうがいいでしょう」と言いました。',en:'Hana said she thinks it will be sunny tomorrow. But the news says it might rain. A friend suggested it would probably be better to bring an umbrella.',q:[['What is the weather forecast?',['Definitely snowing','It might rain','Definitely sunny'],1],['What does Hana’s friend recommend?',['Bringing an umbrella','Buying shoes','Staying awake'],0]]
},
{
 jp:'花は明日早く起きなければなりません。試験があるからです。友達は「全部覚えなくてもいいけど、今夜は早く寝たほうがいい」と言いました。',en:'Hana must get up early tomorrow because she has an exam. Her friend said she need not memorize everything, but should go to bed early.',q:[['Why must Hana get up early?',['She has a train','She has an exam','She is meeting a doctor'],1],['Does Hana need to memorize everything?',['Yes','No','It is forbidden to study'],1]]
},
{
 jp:'花は春から毎日走ることにしました。来月は町の大会に出る予定です。でも、雨の日は家で練習するつもりです。',en:'Hana decided to run every day starting in spring. She is scheduled to enter a local competition next month, but intends to practise indoors on rainy days.',q:[['What has Hana decided to do daily?',['Run','Cook','Swim'],0],['When is the competition?',['Tomorrow','Next month','Next year'],1]]
},
{
 jp:'去年、花は漢字がほとんど読めませんでした。今は簡単なニュースなら読めるようになりました。毎日読むようにしているからです。',en:'Last year Hana could barely read kanji. Now she can read simple news because she makes an effort to read every day.',q:[['What changed?',['She stopped reading','She can now read simple news','She moved to Tokyo'],1],['What helped?',['Daily reading practice','A new train','Watching no news'],0]]
},
{
 jp:'友達が花に地図をくれました。花は道が分からなかったので、友達に駅まで案内してもらいました。お礼に、花はお茶を買ってあげました。',en:'A friend gave Hana a map. Because she did not know the way, Hana had her friend guide her to the station. In thanks, Hana bought the friend tea.',q:[['Who gave Hana a map?',['Her friend','A teacher','A shopkeeper'],0],['What did Hana buy to say thanks?',['Flowers','Tea','Tickets'],1]]
},
{
 jp:'もし明日雨が降ったら、花は家にいます。晴れれば、公園で友達に会います。公園に行くなら、早めに出たほうがいいです。',en:'If it rains tomorrow, Hana will stay home. If it is sunny, she will meet a friend at the park. If going to the park, she should leave early.',q:[['What happens if it rains?',['Hana stays home','Hana meets a friend','Hana goes shopping'],0],['What is the advice for going to the park?',['Leave early','Bring dinner','Take a taxi'],0]]
},
{
 jp:'花は出かけるところでしたが、鍵を忘れてしまいました。鍵を探しているところに、友達が来ました。花は次から前の日に準備しておくことにしました。',en:'Hana was just about to leave but realized she had forgotten her keys. While looking for them, her friend arrived. She decided to prepare things the night before next time.',q:[['What did Hana forget?',['Her phone','Her keys','Her bag'],1],['What will she do next time?',['Prepare the night before','Wake up later','Buy new keys'],0]]
},
{
 jp:'花は初めて納豆を食べてみました。においが強そうでしたが、食べるとおいしかったです。友達と話しながら食べたので、楽しい昼ごはんでした。',en:'Hana tried natto for the first time. It looked strongly scented, but tasted good when eaten. She ate while chatting with friends and enjoyed lunch.',q:[['What did Hana try?',['Natto','Curry','Mochi'],0],['What was she doing while eating?',['Studying','Chatting with friends','Running'],1]]
},
{
 jp:'天気予報によると、明日は雪が降るそうです。外はもう寒いので、本当らしいです。電車も遅れるかもしれません。花は早く出るつもりです。',en:'According to the weather forecast, it will snow tomorrow. Since it is already cold, that seems plausible. Trains might be delayed, so Hana intends to leave early.',q:[['What does the forecast say?',['It will snow','There will be a heatwave','It will be sunny'],0],['Why will Hana leave early?',['To shop','Trains may be delayed','To meet a singer'],1]]
},
{
 jp:'花は先生に作文をほめられました。最初は難しかったですが、先生が毎日短い文を書かせてくれたので、少しずつ上手になりました。',en:'Hana’s teacher praised her composition. It was difficult at first, but the teacher had her write short sentences every day, and she gradually improved.',q:[['What did the teacher praise?',['Hana’s cooking','Hana’s composition','Hana’s shoes'],1],['What did Hana do every day?',['Write short sentences','Sing','Draw pictures'],0]]
},
{
 jp:'日本語が上手になるために、花はニュースを聞いています。聞き取れるように、まずゆっくりした音声を選びます。難しいので、何度も聞きます。',en:'To improve her Japanese, Hana listens to news. To make it possible to understand, she first chooses slow audio. Because it is hard, she listens repeatedly.',q:[['Why does Hana listen to news?',['To learn Japanese','To find a new job','To hear music'],0],['What audio does she choose first?',['Very fast','Slow','No audio'],1]]
},
{
 jp:'「どうして遅れたんですか」「電車が止まったんです」。花は十分しか遅れていませんでしたが、先生に理由を説明しました。',en:'“Why were you late?” “The train stopped.” Hana was only ten minutes late, but explained the reason to her teacher.',q:[['Why was Hana late?',['She overslept','The train stopped','It was raining'],1],['How late was she?',['Ten minutes','An hour','Two days'],0]]
},
{
 jp:'昨日買った本には、海で暮らす人たちの話が書いてあります。花はその人たちが何を食べるか知りたくなりました。毎日魚を食べるかどうかは、まだ分かりません。',en:'A book Hana bought yesterday tells stories about people who live by the sea. She became curious what they eat. She still does not know whether they eat fish every day.',q:[['Where do the people in the book live?',['In the mountains','By the sea','In space'],1],['Does Hana know whether they eat fish every day?',['Yes','No','She already asked them'],1]]
},
{
 jp:'冬になって、町は静かになりました。花は読みやすい本を探しています。難しい漢字が多い本は読みにくいので、短い本から始めます。',en:'As winter arrived, the town grew quiet. Hana is looking for an easy-to-read book. Books with many difficult kanji are hard to read, so she starts with a short one.',q:[['What kind of book is Hana looking for?',['Easy to read','Very expensive','Very old'],0],['Why does she start with a short book?',['Many difficult kanji are hard','She dislikes stories','She lost her glasses'],0]]
},
{
 jp:'夏休みの間、花は毎日図書館に通いました。休日にも勉強してばかりいたわけではありません。海に行ったり、家族と料理を作ったりしました。',en:'During summer holiday, Hana went to the library daily. But it was not the case that she only studied even on days off. She also went to the sea and cooked with her family.',q:[['Did Hana only study during the holiday?',['Yes','No','The text is silent'],1],['Name one other activity.',['Cooking with family','Skiing','Working at a hotel'],0]]
}
];
const ch=window.HANAMI_FOUNDATION_CONTENT?.chapters||[];
if(ch.length!==readings.length)throw Error(`Foundations passages mismatch: ${ch.length} chapters / ${readings.length} passages`);
ch.forEach((c,i)=>{c.reading={...readings[i],id:c.id+'-reading'};});
})();

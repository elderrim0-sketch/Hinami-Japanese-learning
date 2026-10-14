/* Hanami foundations: original, independently written core N5/N4 instructional syllabus.
 * Learning level boundaries are approximate, not official JLPT vocabulary/grammar lists.
 * Each unit has an intuitive mental model, two contextual examples, and a common trap.
 */
(()=>{'use strict';
const RAW=`
@N5|01 · Meet the world|You arrive at Hana's village and learn to say what things are.
です|The polite name-tag at the end of a sentence. Put a noun before it to identify something.|わたしは学生です。|I am a student.|ここは学校です。|This is a school.|です adds politeness; it does not mean “am/is/are” in every Japanese sentence.
は (topic)|A sign above the scene: “As for this...” Everything after the sign comments on that topic.|わたしは花です。|I am Hana.|今日はいい天気です。|As for today, the weather is nice.|As a topic particle, は sounds “wa,” not “ha.” A topic is not always the subject.
じゃありません|Swap the polite name-tag for “is not.” A full noun sentence can be made negative.|あれは学校じゃありません。|That is not a school.|わたしは先生じゃありません。|I am not a teacher.|ではありません is a more formal equivalent. Adjectives and verbs use other negatives.
でした|Change the polite name-tag to “was.” Time in Japanese often lives in the ending.|きのうは休みでした。|Yesterday was a day off.|前は学生でした。|I used to be a student.|Do not attach でした directly to the plain nonpast form of an い-adjective.
も (also)|Instead of pointing at only one thing, add another to the picture: “also/too.”|わたしも学生です。|I am a student too.|これも本です。|This is a book too.|も often replaces は or が; it is not always added after them.
@N5|02 · What's in front of you?|Name things, identify new information, and connect nouns.
が (subject)|Cure Dolly's train: the engine says what happens; が marks who or what does/is it when stated. The subject can be left unspoken if obvious.|ねこがいます。|There is a cat.|雨がふっています。|It is raining.|A hidden subject is not a hidden written が. は highlights a topic; が identifies a grammatical subject.
を (object)|This little tag marks what the verb acts on: the apple gets eaten, the book gets read.|パンを食べます。|I eat bread.|水を飲みます。|I drink water.|を is pronounced “o.” With movement verbs it can mark a route or place passed through.
の (noun link)|A ribbon connecting two nouns: the first tells us whose or what kind of second noun.|花の本です。|It is Hana's book.|日本語の先生です。|A Japanese-language teacher.|の does not always mean possession; it often just describes or classifies.
これ・それ・あれ|Three fingers: near me, near you, away from both of us.|これは何ですか。|What is this?|あれは駅です。|That over there is the station.|これ/それ/あれ stand alone as nouns; この/その/あの go directly before a noun.
この・その・あの|Attach the distance label directly to the noun: this book, that bag, that distant house.|この本はおもしろいです。|This book is interesting.|そのかばんはだれのですか。|Whose bag is that?|You need a noun after この, その or あの.
@N5|03 · Questions in the village|Learn to ask for the right information without translating English word-for-word.
か (question)|Add a question mark made of sound to a polite sentence.|学生ですか。|Are you a student?|水を飲みますか。|Do you drink water?|In ordinary spoken Japanese, intonation can make casual questions without か.
何・だれ|Replace the unknown thing or person with the right question word.|これは何ですか。|What is this?|あの人はだれですか。|Who is that person?|何 can be なに or なん depending on the next sound or construction.
どこ・どちら|Ask for a place or direction; どちら is often the more polite option.|駅はどこですか。|Where is the station?|お手洗いはどちらですか。|Where is the restroom? (polite)|どちら can also mean “which of the two” in other contexts.
いつ・何時|いつ asks “when”; 何時 asks for the clock time.|いつ行きますか。|When will you go?|今、何時ですか。|What time is it now?|何時 as a clock question is なんじ; いつ is a general when-question.
どれ・どの|Choose between items: どれ stands alone; どの goes in front of a noun.|どれがあなたのですか。|Which one is yours?|どの本が好きですか。|Which book do you like?|どの must modify a noun, while どれ does not.
@N5|04 · Actions and the clock|Japanese verbs express politeness and tense with their endings.
〜ます|A polite action ending. Japanese doesn't need a separate word for “I” every time.|毎日歩きます。|I walk every day.|明日、学校へ行きます。|I will go to school tomorrow.|ます is nonpast: habit, present situation or future depending on context.
〜ません|Replace ます with ません to say an action does not happen.|肉を食べません。|I don't eat meat.|今日は働きません。|I won't work today.|This is polite nonpast negative, not the plain-form ない ending.
〜ました|The action happened: put the polite verb into its past ending.|きのう映画を見ました。|I watched a film yesterday.|朝ごはんを食べました。|I ate breakfast.|Don't use ました for ordinary nonpast habits.
〜ませんでした|The polite action did not happen in the past.|きのうは行きませんでした。|I didn't go yesterday.|朝は何も食べませんでした。|I didn't eat anything this morning.|For everyday past negatives, notice the full ませんでした ending.
時間 + に|Time gets a pin. Use に with a specific time on the clock.|七時に起きます。|I get up at seven.|月曜日に会いましょう。|Let's meet on Monday.|Words such as 今日, 明日 and 毎日 ordinarily do not take に for time.
@N5|05 · Find your way|Markers show where actions happen and where people go.
場所 + で|Think “action stage”: で marks where someone actively does something.|図書館で勉強します。|I study at the library.|公園で走ります。|I run in the park.|Use に for location of existence with いる/ある, not で.
場所 + に|A location pin for being somewhere or arriving at a destination.|学校にいます。|I am at school.|東京に着きます。|I arrive in Tokyo.|Compare で: 学校で勉強する is studying there, 学校にいる is being there.
〜へ|An arrow pointing toward a direction or destination.|日本へ行きます。|I'm going to Japan.|家へ帰ります。|I return home.|The particle へ is pronounced “e.” It emphasizes direction.
あります|The existence verb for things and events, rather than people or animals.|ここに本があります。|There is a book here.|あした試験があります。|There is an exam tomorrow.|Use います for people and animals in ordinary cases.
います|The existence verb for living creatures: someone is here.|庭に犬がいます。|There is a dog in the garden.|教室に先生がいます。|The teacher is in the classroom.|ある/いる are not fully interchangeable; remember the living/nonliving contrast first.
@N5|06 · Describe your world|Adjective families behave differently—learn each family as a system.
い形容詞|An い-adjective can end a sentence or describe the noun directly.|この花は赤いです。|This flower is red.|赤い花があります。|There is a red flower.|Not every word ending in い is an い-adjective; きれい is a な-adjective.
な形容詞|This family needs な in front of a noun, but not before polite です.|静かな町です。|It is a quiet town.|この町は静かです。|This town is quiet.|静かです is right; 静かなです is not.
い形容詞の否定|Change final い to くない to say an い-adjective is not true.|今日は寒くないです。|It isn't cold today.|この本は高くないです。|This book isn't expensive.|Do not use じゃない directly after a regular い-adjective.
な形容詞の否定|Use じゃない/じゃありません after a な-adjective's stem.|この部屋は静かじゃありません。|This room isn't quiet.|元気じゃないです。|I'm not well.|きれいじゃない is natural; きれいくない is not.
い形容詞の過去|Past adjectives change their own endings: い → かった.|きのうは寒かったです。|It was cold yesterday.|映画はおもしろかったです。|The film was interesting.|Do not say 寒いでした; the adjective itself takes past tense.
@N5|07 · Shopping and people|Learn particles that connect people, prices and times.
と (with/and)|A clear list: A and B; or doing something together with someone.|母と買い物に行きます。|I go shopping with my mother.|りんごとバナナを買います。|I buy apples and bananas.|と normally lists the named items exhaustively; や suggests examples.
や・など|An open shopping basket: “A, B, and things like that.”|りんごやみかんを買います。|I buy apples, mandarins and such.|本や雑誌などがあります。|There are books, magazines and so on.|や is not the same as と, which makes a closed list.
から・まで (range)|Mark the start and end of a journey through space or time.|九時から五時まで働きます。|I work from nine to five.|家から学校まで歩きます。|I walk from home to school.|Both ends need not appear together: から alone can mark a start.
〜ぐらい|Give an approximate amount; like drawing a fuzzy circle around a number.|三十分ぐらい待ちました。|I waited about thirty minutes.|千円ぐらいです。|It's about one thousand yen.|くらい and ぐらい both occur; approximation isn't always exact.
〜ください|A polite request for a thing; use a noun + をください.|水をください。|Water, please.|この本をください。|This book, please.|For asking someone to do an action, use てください instead.
@N5|08 · The て-form toolbox|One verb shape unlocks a huge amount of conversational Japanese.
て形 (linking)|A connector carriage: chain verbs, or attach helpers such as ください.|顔を洗って、朝ごはんを食べます。|I wash my face and eat breakfast.|音楽を聞いて勉強します。|I listen to music and study.|て-form changes depend on the verb group; 行く is irregular in the て-form.
〜てください|Ask someone politely to do an action: verb て-form + ください.|ここに名前を書いてください。|Please write your name here.|もう一度言ってください。|Please say it again.|This is a request, not a guarantee the other person agrees.
〜てもいい|Ask or say that an action is allowed.|ここに座ってもいいですか。|May I sit here?|写真を撮ってもいいです。|You may take pictures.|いい indicates permission here, not that an action is always recommended.
〜てはいけない|A stop sign: the action is not permitted.|ここで泳いではいけません。|You must not swim here.|このドアを開けてはいけません。|You must not open this door.|This is prohibition, not the same as saying the action is physically impossible.
〜ている|A video or a resulting photograph: an action happening now or the state left by it.|今、本を読んでいます。|I'm reading a book now.|東京に住んでいます。|I live in Tokyo.|With 住む, 知る, 結婚する and others, ている may describe a state.
@N5|09 · Casual Japanese|Hear what friends say when the polite endings disappear.
辞書形|The dictionary form is the plain verb, useful before many grammar patterns.|毎朝走る。|I run every morning.|明日、友達に会う。|I'll see a friend tomorrow.|Dictionary form is not the same as a polite command.
ない形|A plain negative: change the verb ending to say “don't / won't.”|今日は行かない。|I'm not going today.|魚は食べない。|I don't eat fish.|The ない-form is not formed by simply removing ます from every verb.
た形|A plain past form: what happened or what has been completed.|宿題をした。|I did my homework.|昨日、映画を見た。|I watched a movie yesterday.|It uses patterns parallel to the て-form: 読んで→読んだ.
〜たり〜たりする|Show a few representative activities, rather than listing every action.|日曜日は読んだり、寝たりします。|On Sundays I read, sleep and so on.|歌ったり踊ったりしました。|We sang, danced and did other things.|The final する carries the tense; たり actions are examples.
〜つもり|Put a plan in your calendar: your present intention about a future action.|来年、日本へ行くつもりです。|I intend to go to Japan next year.|今日は出かけないつもりです。|I intend not to go out today.|An intention is not a scheduled certainty; compare 予定.
@N5|10 · Feelings and invitations|Build sentences you can use with friends immediately.
〜たい|Attach “want to” to a verb stem: your own desire becomes visible.|日本語を話したいです。|I want to speak Japanese.|ラーメンを食べたいです。|I want to eat ramen.|For another person's desire, たがっている is often more appropriate.
〜ましょう|Invite someone into an action: “Let's do it.”|いっしょに行きましょう。|Let's go together.|少し休みましょう。|Let's take a short break.|This is an invitation or suggestion, not a command.
〜ませんか|A polite, gentle invitation formed as a negative question.|コーヒーを飲みませんか。|Would you like to have coffee?|いっしょに勉強しませんか。|Shall we study together?|Though negative in form, it's often an invitation, not a refusal.
〜から (reason)|Glue a reason to a result: “because X, Y.”|雨ですから、行きません。|Because it's raining, I won't go.|眠いから、寝ます。|I'm sleepy, so I'll sleep.|から also means “from”; the surrounding sentence tells you its job.
〜けど|Soften or contrast ideas: “but...,” sometimes leaving the rest unspoken.|行きたいけど、時間がありません。|I want to go, but I have no time.|おいしいけど、高いです。|It's delicious, but expensive.|A trailing けど can soften a request; it is not always a hard contrast.
@N5|11 · Order your day|Compare, sequence and link events in everyday situations.
より|Place one thing next to another for comparison: “than.”|電車はバスより速いです。|Trains are faster than buses.|今日は昨日より暑いです。|Today is hotter than yesterday.|The compared feature comes after the より phrase.
〜のほうが|Give the other side of the comparison: “A is more ...”|猫のほうが好きです。|I like cats more.|バスより電車のほうが便利です。|Trains are more convenient than buses.|のほうが marks the more-like side; it isn't a stand-alone superlative.
いちばん|The top spot in a group: “the most.”|これがいちばん安いです。|This is the cheapest.|春がいちばん好きです。|I like spring the most.|The comparison group is sometimes expressed with の中で.
〜前に|Look ahead from an event: “before doing X.”|寝る前に歯をみがきます。|I brush my teeth before sleeping.|食事の前に手を洗います。|I wash my hands before a meal.|Use dictionary-form verb + 前に or noun + の前に.
〜てから|First finish action A, then do B: the order matters.|ご飯を食べてから、勉強します。|After eating, I study.|宿題をしてから遊びます。|I play after finishing homework.|Unlike loose て-connecting, てから explicitly highlights sequence.
@N5|12 · Connect your thoughts|Round out the basic sentence system before moving into N4.
〜ことができる|Turn the action into a noun-like skill: “able to do.”|日本語を読むことができます。|I can read Japanese.|ここで泳ぐことができます。|You can swim here.|This expresses ability or possibility; not necessarily permission.
〜たことがある|Keep an experience in your memory album: “have done before.”|京都に行ったことがあります。|I've been to Kyoto.|寿司を食べたことがありません。|I've never eaten sushi.|Use the past/plain た-form before ことがある.
〜とき|Put a label on a moment: “when X.”|ひまなとき、本を読みます。|When I have free time, I read.|家に帰るとき、電話します。|I'll call when I go home.|Verb form changes whether an event precedes or follows the moment.
〜あとで|Put another action after something that has finished.|仕事のあとで買い物します。|I shop after work.|食べたあとで歯をみがきます。|I brush my teeth after eating.|Use noun + のあとで, or plain past verb + あとで.
〜たら (if/when)|Imagine reaching a situation; what happens if it comes true?|雨が降ったら家にいます。|If it rains, I'll stay home.|時間があったら会いましょう。|If we have time, let's meet.|たら can mark a future condition even though it resembles the past form.
@N5|13 · Numbers, people and objects|Learn how real Japanese counts different kinds of things.
〜つ (general counters)|For many everyday objects, learn the special counting family ひとつ、ふたつ、みっつ.|りんごを二つください。|Two apples, please.|質問が三つあります。|I have three questions.|ひとつ/ふたつ/etc. are irregular; they are not number + つ in all cases.
〜人 (people)|People are counted with 人, but the first two are special.|家族は四人です。|There are four people in my family.|部屋に二人います。|There are two people in the room.|一人 is ひとり and 二人 is ふたり, not いちにん/ににん.
〜枚・〜本|Counters classify an object's shape: flat things versus long things.|切符を二枚買いました。|I bought two tickets.|ペンが三本あります。|There are three pens.|Counter sound changes occur: 一本 いっぽん, 三本 さんぼん.
〜回・〜度|Count the number of occasions: once, twice, three times.|日本へ二回行きました。|I've been to Japan twice.|もう一度言ってください。|Please say it one more time.|一回 is いっかい; 一度 is いちど.
いくつ・いくら|Ask how many or how much without needing a specific English sentence structure.|りんごはいくつありますか。|How many apples are there?|これはいくらですか。|How much is this?|いくつ counts things; いくら asks price or amount of money.
@N5|14 · Verbs have families|Recognise verb groups so you can build て, ない and た forms.
五段動詞 (group 1)|Think of the final sound as a gear that shifts through rows: 書く→書きます→書いて.|毎日、本を読みます。|I read books every day.|昨日、手紙を書きました。|I wrote a letter yesterday.|Group 1 verbs can end in る too: 帰る is group 1.
一段動詞 (group 2)|These often let you remove る and attach a new ending: 食べる→食べます.|朝ごはんを食べます。|I eat breakfast.|七時に起きます。|I wake up at seven.|Some -いる/-える verbs belong to group 1, so learn exceptions.
する・来る (irregular)|Two high-frequency verbs need their own small map: する→します, 来る→来ます.|明日、勉強します。|I'll study tomorrow.|友達が家に来ます。|My friend is coming to my home.|来る is くる but 来ます is きます. Learn forms in sentences.
て形の音変化|Hear the ending rhyme families: 読む→読んで, 書く→書いて, 話す→話して.|本を読んでください。|Please read the book.|ちょっと待ってください。|Please wait a moment.|行く is a special case: 行って, not 行いて.
自動詞・他動詞|Sometimes the door opens; sometimes someone opens it. Japanese often has different verbs.|ドアが開きました。|The door opened.|母がドアを開けました。|My mother opened the door.|開く (intransitive) typically takes が; 開ける (transitive) can take を.
@N5|15 · The everyday details|Finish the basic patterns needed for ordinary conversation.
好き・嫌い|These are adjective-like expressions of liking and dislike, not direct copies of English verbs.|音楽が好きです。|I like music.|野菜が嫌いです。|I dislike vegetables.|The liked thing is commonly marked が, even when English uses a direct object.
上手・下手|Talk about skill with adjective-like expressions.|妹は絵が上手です。|My younger sister is good at drawing.|私は歌が下手です。|I'm bad at singing.|上手 can sound boastful about yourself; 得意 can be more natural.
欲しい|Unlike たい for wanting to DO something, 欲しい means wanting a THING.|新しい自転車が欲しいです。|I want a new bicycle.|水が欲しいです。|I want some water.|Wanted object commonly takes が; desire for an action uses verb stem + たい.
もう・まだ|See time with two signs: already / not yet / still.|もう食べました。|I have already eaten.|まだ終わっていません。|I haven't finished yet.|まだ with a negative often means “not yet”; with affirmative it often means “still.”
な形容詞・名詞の過去|Finish the past adjective system: quiet WAS quiet, student WAS a student.|子どものころ元気でした。|I was energetic as a child.|その町は静かじゃありませんでした。|That town wasn't quiet.|Nouns and な-adjectives use でした/じゃありませんでした; い-adjectives use かった.
@N4|01 · Say what you think|N4 adds opinions, reports and careful uncertainty.
〜だ (plain copula)|The casual noun/な-adjective sentence ending. This is the plain counterpart of です in many statements.|今日は休みだ。|Today is a day off.|この町は静かだ。|This town is quiet.|Do not put だ directly after a regular い-adjective: 高い, not 高いだ.
〜と思う|Put a whole plain sentence inside a thought bubble: “I think...”|明日は雨だと思います。|I think it'll rain tomorrow.|この映画はおもしろいと思う。|I think this film is interesting.|The clause before と思う normally takes plain form.
〜と言う|Put spoken words inside quotation marks: “say/call...”|先生は「始めましょう」と言いました。|The teacher said, “Let's begin.”|これは日本語で何と言いますか。|What is this called in Japanese?|The quotation marker と doesn't have the same job as と meaning “with.”
〜でしょう|Offer a likely guess or invite gentle agreement.|あしたは晴れるでしょう。|It will probably be sunny tomorrow.|この道でいいでしょうか。|Would this route be all right?|でしょう is a degree of likelihood or soft question, not guaranteed truth.
〜かもしれない|Leave room for other outcomes: “might/may.”|彼は来ないかもしれません。|He might not come.|午後は雨かもしれない。|It might rain this afternoon.|Usually a weaker statement of certainty than はずだ.
@N4|02 · Rules and responsibilities|Make polite advice, obligations, permissions and prohibitions.
〜なければならない|An obligation: if you don't do it, things don't work—“must.”|明日早く起きなければなりません。|I must get up early tomorrow.|薬を飲まなければならない。|I must take medicine.|The pattern attaches to a verb's ない-stem, not its dictionary form.
〜なくてもいい|A release from obligation: you don't have to do it.|今日は来なくてもいいです。|You don't have to come today.|全部食べなくてもいい。|You don't have to eat everything.|“Don't have to” is NOT the same as “must not.”
〜ないでください|Politely request that someone *not* do an action.|ここで写真を撮らないでください。|Please don't take photos here.|心配しないでください。|Please don't worry.|Contrast てはいけない, which states prohibition more strongly.
〜ほうがいい|Offer advice: one option is probably better.|早く寝たほうがいいです。|You should go to sleep early.|甘い物を食べないほうがいい。|You'd better not eat sweets.|Advice commonly uses verb past た before affirmative ほうがいい.
〜てもかまわない|Make permission explicit: “I don't mind if...”|ここに座ってもかまいません。|I don't mind if you sit here.|遅れてもかまわない。|It's all right even if you're late.|Permission can be contextual and doesn't mean every rule disappears.
@N4|03 · Plans and decisions|Talk about the future as intentions, scheduled events and choices.
〜ようと思う|You are considering doing something: an intention in your mind.|週末は勉強しようと思います。|I'm thinking of studying this weekend.|今日は歩いて帰ろうと思う。|I think I'll walk home today.|Use volitional verb form + と思う, not just dictionary + と思う.
〜予定だ|A plan written on the calendar rather than only a feeling.|来月、旅行する予定です。|I plan to travel next month.|会議は三時に始まる予定です。|The meeting is scheduled to start at three.|A plan can change; 予定 is not an absolute promise.
〜ことにする|Picture yourself choosing an option and pressing “decide.”|毎朝走ることにしました。|I decided to run every morning.|明日は休むことにします。|I've decided to rest tomorrow.|The speaker or actor makes the decision.
〜ことになる|A decision came about from circumstances, rules or other people.|来年、東京へ行くことになりました。|It's been decided that I'll go to Tokyo next year.|試験は来週になりました。|The exam has been moved to next week.|Focus is on the outcome, not necessarily your personal choice.
〜つもりだった|A past plan that might not have happened as intended.|昨日行くつもりでした。|I had intended to go yesterday.|買うつもりだったけど、やめた。|I meant to buy it, but changed my mind.|An old intention does not confirm the action actually happened.
@N4|04 · Abilities and change|Talk about what people can do and how skills improve.
可能形|Many verbs have a dedicated “can” form: 書く→書ける, 食べる→食べられる.|漢字が読めます。|I can read kanji.|一人で料理を作れます。|I can cook by myself.|The object can take が; verb groups form potential verbs differently.
見える・聞こえる|Sight and sound reach you naturally, without trying.|山が見えます。|I can see the mountain.|音楽が聞こえます。|I can hear music.|見られる/聞ける often imply ability or opportunity; 見える/聞こえる perception.
〜ようになる|Compare before and after: you have become able to do something.|日本語が話せるようになりました。|I've become able to speak Japanese.|早く起きるようになった。|I've started getting up early.|This describes a change over time, not a one-off action.
〜なくなる|The action/state used to hold, but no longer does.|最近テレビを見なくなりました。|I no longer watch TV much.|寒くなくなりました。|It isn't cold anymore.|Attach to ない without final い: ない→なくなる.
〜ようにする|Set a habit goal and try to make it happen regularly.|毎日日本語を読むようにしています。|I make an effort to read Japanese every day.|夜は食べすぎないようにします。|I'll try not to overeat at night.|An effort or habit, not proof the goal has already been achieved.
@N4|05 · Kindness goes around|Japanese tracks the direction of giving and receiving.
あげる|Something goes from me/our side to someone else.|友達に本をあげました。|I gave my friend a book.|妹に花をあげます。|I'll give my younger sister flowers.|Giving direction matters; don't default to あげる for every “give.”
くれる|Someone gives something toward me or someone close to me.|友達が本をくれました。|My friend gave me a book.|先生が写真をくれました。|The teacher gave me a photograph.|The recipient is the speaker or their in-group in ordinary use.
もらう|Look at the receiver: “receive something from someone.”|友達にプレゼントをもらいました。|I received a present from a friend.|母から手紙をもらいました。|I received a letter from my mother.|The giver can be marked by に or から; the receiver is the subject.
〜てあげる|Do a helpful action for someone else.|弟に宿題を教えてあげました。|I helped my younger brother with his homework.|友達に道を教えてあげる。|I'll show my friend the way.|Can sound patronizing when said about helping a superior; use with care.
〜てくれる・てもらう|Receive a helpful action: focus on who helps or on your receiving it.|友達が手伝ってくれました。|A friend helped me.|先生に説明してもらいました。|I got the teacher to explain it.|てくれる centers the giver's help toward you; てもらう centers receiving that help.
@N4|06 · What if?|Learn several Japanese ways to express conditions.
〜と (automatic if)|Whenever trigger A happens, result B follows naturally.|春になると花が咲きます。|When spring comes, flowers bloom.|このボタンを押すと音が出ます。|When you press this button, a sound comes out.|Avoid using と for a direct personal command in the result clause.
〜ば|State a condition for another result, often as a general possibility.|時間があれば行きます。|If I have time, I'll go.|安ければ買います。|If it's cheap, I'll buy it.|Formation differs for verbs and adjectives: 行けば, 安ければ.
〜たら|Imagine that a situation has happened: then what?|駅に着いたら電話してください。|Please call me when you arrive at the station.|雨だったら行きません。|If it's rainy, I won't go.|たら works with requests and intentions that are awkward with automatic と.
〜なら|Pick up the condition/topic the other person just mentioned: “if it's about X...”|日本に行くなら京都もいいですよ。|If you're going to Japan, Kyoto is good too.|魚なら食べられます。|If it's fish, I can eat it.|Often reacts to new information or proposed circumstances.
〜ても (even if)|Keep the result true despite the condition.|雨が降っても行きます。|I'll go even if it rains.|高くても買います。|I'll buy it even if it's expensive.|ても is concessive, unlike たら which simply sets a condition.
@N4|07 · Time inside an action|Show a process beginning, finishing or preparing.
〜ところだ|Zoom in on a moment: “just about to,” “in the middle,” or “just did,” depending on verb form.|今から出かけるところです。|I'm just about to go out.|今、調べているところです。|I'm in the middle of checking.|Dictionary/ている/た + ところ identify different moments.
〜たところ|Capture the moment immediately after an action.|今、駅に着いたところです。|I have just arrived at the station.|今、食べたところです。|I just ate.|たところ stresses how recently it finished.
〜てしまう|An action gets fully done—or happens regrettably/accidentally.|財布を忘れてしまいました。|I unfortunately forgot my wallet.|宿題を全部やってしまった。|I finished all my homework.|Whether it's regrettable or simply complete depends on context.
〜ておく|Do something now and leave it ready for later.|旅行の前に予約しておきます。|I'll make a reservation before travelling.|ドアを開けておいてください。|Please leave the door open.|Preparation, or leaving the resulting condition in place.
〜はじめる・〜おわる|Attach a beginning or ending to the action stem.|雨が降り始めました。|It started raining.|もう読み終わりました。|I've finished reading.|These are auxiliary verbs attached to the ます-stem, not the て-form.
@N4|08 · Try, notice, describe|Explore simultaneous actions and how things appear.
〜てみる|Try an action to see what it is like.|この服を着てみます。|I'll try on these clothes.|日本語で話してみてください。|Please try speaking in Japanese.|Try-and-see is different from physically seeing (見る).
〜ながら|Two actions run at once, with the main action usually last.|音楽を聞きながら歩きます。|I walk while listening to music.|テレビを見ながら食べました。|I ate while watching TV.|ながら attaches to the verb's ます-stem, not its dictionary form.
〜し〜し|Stack reasons or descriptions without closing the list.|この町は静かだし、便利です。|This town is quiet and convenient.|安いし、おいしいし、また来たい。|It's cheap and tasty, so I want to come again.|Often suggests other unstated reasons; plain forms usually precede し.
〜そうだ (appearance)|Your eyes see a clue: “looks like it will...”|雨が降りそうです。|It looks like rain.|このケーキはおいしそうです。|This cake looks delicious.|For adjective appearance, おいしい→おいしそう (drop い).
〜すぎる|The volume knob went too far: “too much/too...”|今日は食べすぎました。|I ate too much today.|このかばんは重すぎます。|This bag is too heavy.|Attach to ます-stem or adjective stem, not always the full dictionary form.
@N4|09 · News and inference|Tell the difference between seeing evidence and hearing a report.
〜そうだ (hearsay)|You're passing along something you heard: “I heard that...”|明日は雨が降るそうです。|I hear it will rain tomorrow.|彼は来ないそうです。|I heard he isn't coming.|Hearsay uses plain forms: 降るそう; appearance uses stems: 降りそう.
〜らしい|Your evidence or reports point to a conclusion: “apparently/seems.”|あの店は人気らしいです。|That shop is apparently popular.|彼はもう帰ったらしい。|Apparently he already went home.|らしい is less direct than a witnessed fact.
〜ようだ|Form an inference based on the situation: “it seems/as if.”|外は寒いようです。|It seems cold outside.|だれもいないようです。|It seems nobody is there.|Nouns and な-adjectives typically take の/な before ようだ.
〜みたいだ|A conversational “looks/seems like” comparison.|あの雲は犬みたいです。|That cloud looks like a dog.|もう終わったみたいだ。|It seems to be over already.|みたい is more casual than よう; both can mark resemblance/inference.
〜はずだ|The evidence sets an expectation: “should be / expected to.”|電車はもう着いたはずです。|The train should have arrived already.|今日は休みのはずです。|Today is supposed to be a day off.|はず expresses expectation, not moral advice like ほうがいい.
@N4|10 · Being affected|Change perspective with the passive, causative and honorific basics.
受け身 (passive)|Turn the camera toward the receiver of an action: “was done to.”|先生にほめられました。|I was praised by the teacher.|雨に降られました。|I got caught in the rain.|Japanese passive can also express inconvenience; form depends on verb group.
使役 (causative)|Someone causes or lets another person perform an action.|母は子どもに野菜を食べさせます。|The mother makes the child eat vegetables.|先生は学生を帰らせました。|The teacher let the students go home.|Causative may mean “make” or “let”; context matters greatly.
〜させてください|Ask permission to do something, literally “please let me...”|少し考えさせてください。|Please let me think a little.|先に帰らせてください。|Please allow me to leave early.|A polite request for permission, not a direct instruction to the listener.
〜られる (potential/passive)|Same ending, two different jobs with many ichidan verbs: ability or passive.|この魚は食べられます。|This fish can be eaten.|ケーキは妹に食べられました。|The cake was eaten by my younger sister.|Look at the subject and context: 食べられる can mean “can eat” or “is eaten.” Godan verbs such as 話す form potential 話せる.
尊敬語の入口|Respectful language raises the person you're speaking about.|先生はいらっしゃいますか。|Is the teacher here?|先生がおっしゃいました。|The teacher said it.|いらっしゃる and おっしゃる are special honorific verbs; memorize them in context.
@N4|11 · Reasons and goals|Explain why you do something and what it is for.
〜ために (purpose)|Picture the goal at the end of the path: “in order to.”|日本で働くために勉強します。|I study in order to work in Japan.|旅行のためにお金をためます。|I save money for travel.|Purpose ために generally pairs with intentional actions; ので/から give causes.
〜ように (goal)|Aim for an outcome, especially a new ability or an event outside direct control.|忘れないようにメモします。|I take notes so I won't forget.|聞こえるように大きく話します。|I speak loudly so people can hear.|Contrast ために for a direct intentional goal.
〜ので (reason)|Give a cause with softer explanatory tone than から in many contexts.|雨が降っているので出かけません。|I won't go out because it's raining.|静かなので、ここで勉強します。|Since it's quiet, I study here.|Plain な-adjective/noun + なので, not だので.
〜のに (despite)|A surprise clash: “even though X, Y.”|勉強したのに、忘れました。|I studied, yet I forgot.|安いのに、丈夫です。|It's cheap, yet durable.|Despite/contrary expectation, not the “for doing” meaning of のに.
〜ように言う|Ask or tell someone to do something indirectly.|先生は早く来るように言いました。|The teacher told us to come early.|母に忘れないように言われた。|I was told by my mother not to forget.|This reports a request or instruction, not direct quoted speech.
@N4|12 · More natural Japanese|Put nuance into everyday conversations and keep the meaning precise.
〜んです|Open a backstage door and explain the situation: “the thing is...”|どうして遅れたんですか。|Why were you late?|電車が遅れたんです。|The thing is, the train was delayed.|Nouns/な-adjectives use なんです; it can soften or seek explanation.
〜しか〜ない|Only one option remains, with negative grammar.|百円しかありません。|I have only one hundred yen.|これしか食べません。|I only eat this.|しか requires a negative predicate; だけ does not.
〜ばかり|The same action or type happens almost all the time: “nothing but.”|弟はゲームばかりしています。|My brother does nothing but play games.|甘い物ばかり食べています。|I'm eating too many sweets all the time.|Can express speaker judgment; not always a mathematically exclusive “only.”
〜ほど|Use something as a scale: “to the extent / as much as.”|今日は昨日ほど寒くないです。|It's not as cold as yesterday.|泣きたいほど嬉しいです。|I'm so happy I could cry.|ほど appears in different comparison and degree constructions.
〜という|Give the name or content of an idea: “called / that...”|花という名前です。|It is a name called Hana.|彼が来るという話を聞きました。|I heard a story that he is coming.|という can quote, label or explain a noun.
@N4|13 · Ideas inside ideas|Read longer sentences where a whole clause modifies a noun.
連体修飾 (relative clause)|A tiny sentence can describe a noun without using English who/that/which.|昨日買った本はおもしろいです。|The book I bought yesterday is interesting.|私が作ったケーキです。|It's the cake I made.|Put a plain-form clause immediately before the noun it describes.
〜の (nominaliser)|Turn a whole action into a thing that can be liked, seen or discussed.|走るのが好きです。|I like running.|彼が歌うのを聞きました。|I heard him sing.|This の is not always possession: it can package a verb phrase into a noun.
〜こと (nominaliser)|Package an activity as a general concept rather than a specific moment.|読むことは大切です。|Reading is important.|日本語を勉強することが好きです。|I like studying Japanese.|こと often sounds more abstract than の; the two are not always interchangeable.
〜かどうか|Make a yes/no question into one piece inside a larger sentence: “whether...”|明日雨が降るかどうか分かりません。|I don't know whether it will rain tomorrow.|行くかどうか教えてください。|Please tell me whether you'll go.|With question words, use the word + か, not necessarily かどうか.
疑問詞 + か|Put an unknown answer inside a statement: where, who, when, what...|彼がどこにいるか知りません。|I don't know where he is.|何を食べるか決めました。|I decided what to eat.|Embedded questions often use plain forms rather than polite ます/です.
@N4|14 · Becoming and attempting|Describe visible change and an action about to begin.
〜くなる|An い-adjective transforms into its “become” form: 寒い→寒くなる.|夜は寒くなります。|It gets cold at night.|日本語が楽しくなりました。|Japanese has become fun.|Drop adjective final い and add くなる, not いになる.
〜になる|A noun or な-adjective changes into a new state.|医者になりたいです。|I want to become a doctor.|部屋が静かになりました。|The room became quiet.|Noun/な-adjective + に; い-adjective + く.
〜ようとする|Catch the moment of trying or being about to start an action.|出かけようとしたとき、電話が来ました。|Just as I was about to go out, a call came.|何度も開けようとしました。|I tried repeatedly to open it.|The volitional form is needed: 行こうとする, not 行くとする.
〜続ける|Keep an action running, like a long train with no final stop yet.|一時間歩き続けました。|I kept walking for an hour.|日本語を勉強し続けたいです。|I want to keep studying Japanese.|Attach to the ます-stem: 読み続ける, not 読む続ける.
〜やすい・〜にくい|Say an action is easy or difficult to do.|この本は読みやすいです。|This book is easy to read.|この漢字は覚えにくいです。|This kanji is hard to remember.|Use the ます-stem: 読みやすい / 覚えにくい.
@N4|15 · Read between the lines|Understand everyday nuance that appears in N4 conversation and short articles.
〜ずに|A concise way to say “without doing” an action.|朝ごはんを食べずに学校へ行きました。|I went to school without eating breakfast.|何も言わずに帰りました。|I went home without saying anything.|する becomes せずに; this form is more literary than ないで.
〜てばかりいる|A repeated action dominates the scene: “keep doing nothing but...”|遊んでばかりいないで。|Don't do nothing but play.|彼は寝てばかりいます。|He's always just sleeping.|The てばかりいる form specifically emphasizes repeated behavior.
〜間・〜間に|Think of a time window: throughout it versus at some point inside it.|夏休みの間、働きます。|I'll work during the summer holiday.|留守の間に荷物が届きました。|A package arrived while I was away.|間 often spans the whole time; 間に often marks something occurring within it.
〜のような|Use another noun as a picture to describe something: “like...”|夢のような時間でした。|It was a dreamlike time.|先生のような人になりたいです。|I want to become someone like my teacher.|のような modifies a noun; のように typically modifies how something is done.
〜に違いない|A strong inference: evidence makes you almost certain.|彼は知っているに違いない。|He must know.|あの音は雷に違いない。|That sound must be thunder.|This indicates a high level of confidence, not an obligation.
`;
const chapters=[];let chapter=null;
for(const line of RAW.trim().split('\n')){
 const a=line.split('|').map(x=>x.trim());
 if(line.startsWith('@')){if(a.length!==3)throw Error('Bad foundations chapter '+line);chapter={id:`${a[0].slice(1)}-${chapters.filter(x=>x.level===a[0].slice(1)).length+1}`,level:a[0].slice(1),name:a[1],quest:a[2],lessons:[]};chapters.push(chapter);continue}
 if(a.length!==7)throw Error(`Bad foundation lesson (${a.length}) ${line}`);
 chapter.lessons.push({id:`${chapter.id}-g${chapter.lessons.length+1}`,pattern:a[0],idea:a[1],ja:a[2],en:a[3],ja2:a[4],en2:a[5],trap:a[6]});
}
window.HANAMI_FOUNDATION_CONTENT={chapters};
})();

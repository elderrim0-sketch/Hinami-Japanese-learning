/* Locally available starter content. Full N5–N1 material loads separately from OpenJLPT. */
window.HANAMI_STARTER = (() => {
const lines = {
 N5:`私|わたし|I; me
あなた|あなた|you
日本|にほん|Japan
日本語|にほんご|Japanese language
学生|がくせい|student
先生|せんせい|teacher
学校|がっこう|school
本|ほん|book
水|みず|water
火|ひ|fire
木|き|tree; wood
山|やま|mountain
川|かわ|river
人|ひと|person
友達|ともだち|friend
家|いえ|house; home
猫|ねこ|cat
犬|いぬ|dog
花|はな|flower
桜|さくら|cherry blossom
空|そら|sky
雨|あめ|rain
今日|きょう|today
明日|あした|tomorrow
昨日|きのう|yesterday
朝|あさ|morning
夜|よる|night
食べる|たべる|to eat
飲む|のむ|to drink
行く|いく|to go
来る|くる|to come
見る|みる|to see
読む|よむ|to read
書く|かく|to write
話す|はなす|to speak
聞く|きく|to listen; to ask
大きい|おおきい|big
小さい|ちいさい|small
新しい|あたらしい|new
古い|ふるい|old
好き|すき|liking; fond of
ありがとう|ありがとう|thank you
こんにちは|こんにちは|hello
おはよう|おはよう|good morning
さようなら|さようなら|goodbye
はい|はい|yes
いいえ|いいえ|no
一|いち|one
二|に|two
三|さん|three
四|よん|four
五|ご|five
六|ろく|six
七|なな|seven
八|はち|eight
九|きゅう|nine
十|じゅう|ten`,
 N4:`旅行|りょこう|travel; trip
料理|りょうり|cooking; cuisine
生活|せいかつ|daily life
必要|ひつよう|necessary
経験|けいけん|experience
説明|せつめい|explanation
準備|じゅんび|preparation
予定|よてい|schedule; plan
心配|しんぱい|worry
便利|べんり|convenient
不便|ふべん|inconvenient
運転|うんてん|driving
予約|よやく|reservation
質問|しつもん|question
答え|こたえ|answer
始める|はじめる|to begin
続ける|つづける|to continue
決める|きめる|to decide
忘れる|わすれる|to forget
迎える|むかえる|to welcome`,
 N3:`環境|かんきょう|environment
文化|ぶんか|culture
社会|しゃかい|society
責任|せきにん|responsibility
影響|えいきょう|influence
結果|けっか|result
原因|げんいん|cause
状況|じょうきょう|circumstances
期待|きたい|expectation
判断|はんだん|judgment
意見|いけん|opinion
改善|かいぜん|improvement`,
 N2:`価値観|かちかん|sense of values
傾向|けいこう|tendency
抽象的|ちゅうしょうてき|abstract
妥協|だきょう|compromise
促進|そくしん|promotion; acceleration
効率|こうりつ|efficiency
制限|せいげん|restriction
適応|てきおう|adaptation
現象|げんしょう|phenomenon
把握|はあく|grasp; understanding`,
 N1:`葛藤|かっとう|inner conflict
概念|がいねん|concept
顕著|けんちょ|remarkable; conspicuous
憂鬱|ゆううつ|melancholy
躊躇|ちゅうちょ|hesitation
遂行|すいこう|execution; accomplishment
脆弱|ぜいじゃく|fragility
是正|ぜせい|correction; rectification
俯瞰|ふかん|bird's-eye view
精緻|せいち|elaborate; meticulous`
};
const grammar = {
 N5:[
 ['〜は','topic marker; as for','Noun + は','私は学生です。','I am a student.','Written は but pronounced wa when marking a topic.'],
 ['〜が','subject marker','Noun + が','猫がいます。','There is a cat.','Focuses on the subject or new information.'],
 ['〜を','direct object marker','Noun + を + Verb','水を飲みます。','I drink water.','The particle を is pronounced o.'],
 ['〜に','at; to; in','Noun + に','学校に行きます。','I go to school.','Marks time, destination, or location of existence.'],
 ['〜で','at; by means of','Noun + で','図書館で勉強します。','I study at the library.','Used for location of an action or means.'],
 ['〜です','polite copula; is/am/are','Noun + です','これは本です。','This is a book.','A fundamental polite sentence ending.'],
 ['〜ません','polite negative','Verb masu-stem + ません','肉を食べません。','I do not eat meat.','Negative polite form of verbs.'],
 ['〜たい','want to do','Verb masu-stem + たい','日本に行きたいです。','I want to go to Japan.','Expresses your own desire.'],
 ['〜ている','ongoing action or resulting state','Verb て-form + いる','今、本を読んでいます。','I am reading a book now.','Often used as ています in polite speech.']
 ],
 N4:[['〜ながら','while doing','Verb masu-stem + ながら','音楽を聞きながら勉強します。','I study while listening to music.','Two actions at once; second is primary.'],['〜と思う','I think that','Plain clause + と思う','明日は雨だと思います。','I think it will rain tomorrow.','Quote opinions or guesses.'],['〜てしまう','finish; unfortunately do','Verb て-form + しまう','財布を忘れてしまいました。','I unfortunately forgot my wallet.','Can imply regret or completion.'],['〜そうだ','it looks like','Adjective stem + そうだ','おいしそうです。','It looks delicious.','Based on appearances.']],
 N3:[['〜ように','so that; in order to','Verb + ように','忘れないように書きます。','I write it down so I do not forget.','Expresses an intended result.'],['〜わけではない','it is not that','Plain clause + わけではない','嫌いなわけではありません。','It is not that I dislike it.','Partial negation.'],['〜ばかり','nothing but; only','Noun / Verb-te + ばかり','ゲームばかりしています。','I only play games.','An excess or repeated behavior.']],
 N2:[['〜にもかかわらず','despite; notwithstanding','Plain clause / Noun + にもかかわらず','雨にもかかわらず行きました。','I went despite the rain.','Formal contrast.'],['〜ざるを得ない','cannot avoid doing','Verb nai-stem + ざるを得ない','計画を変えざるを得ません。','We have no choice but to change the plan.','Exception: する → せざるを得ない.']],
 N1:[['〜を余儀なくされる','be forced to','Noun + を余儀なくされる','中止を余儀なくされました。','We were forced to cancel.','Formal and often written.'],['〜まみれ','covered in; smeared with','Noun + まみれ','泥まみれになりました。','I became covered in mud.','Often for unpleasant material.']]
};
const K={N5:`日|day; sun|ニチ, ジツ|ひ, -び|4
月|moon; month|ゲツ, ガツ|つき|4
火|fire|カ|ひ|4
水|water|スイ|みず|4
木|tree; wood|モク, ボク|き|4
金|gold; money|キン|かね|8
土|earth; soil|ド, ト|つち|3
人|person|ジン, ニン|ひと|2
大|big|ダイ, タイ|おお|3
小|small|ショウ|ちい|3
山|mountain|サン|やま|3
川|river|セン|かわ|3
本|book; origin|ホン|もと|5
語|language; word|ゴ|かた|14
学|study|ガク|まな|8
校|school|コウ||10
私|I; private|シ|わたし|7
食|eat; food|ショク|た|9
見|see|ケン|み|7
行|go|コウ, ギョウ|い|6
一|one|イチ|ひと|1
二|two|ニ|ふた|2
三|three|サン|み|3`,
 N4:`会|meet|カイ|あ|6
思|think|シ|おも|9
旅|trip|リョ|たび|10
運|carry; luck|ウン|はこ|12
転|turn|テン|ころ|11
働|work|ドウ|はたら|13
心|heart|シン|こころ|4
重|heavy|ジュウ|おも|9
医|medical|イ|い|7
意|idea|イ||13`,
 N3:`環|ring; environment|カン||17
境|boundary|キョウ|さかい|14
責|responsibility|セキ|せ|11
影|shadow|エイ|かげ|15
響|echo; impact|キョウ|ひび|20
決|decide|ケツ|き|7
論|argument|ロン||15
議|deliberation|ギ||20`,
 N2:`価|value|カ|あたい|8
傾|incline|ケイ|かたむ|13
抽|extract|チュウ|ぬ|8
象|elephant; phenomenon|ショウ, ゾウ||12
効|effect|コウ|き|8
率|rate|リツ|ひき|11`,
 N1:`葛|kudzu|カツ|くず|11
藤|wisteria|トウ|ふじ|18
憂|gloom|ユウ|うれ|15
鬱|depression|ウツ||29
躊|hesitate|チュウ||21
躇|hesitate|チョ||19
緻|fine; detailed|チ||16
瞰|look down|カン||17`};
const vocab={},kanji={},gram={};
for(const lvl of ['N5','N4','N3','N2','N1']){
 vocab[lvl]=lines[lvl].split('\n').map((s,i)=>{const [word,reading,meaning]=s.split('|');return {id:`starter-${lvl}-${i}`,word,reading,romaji:'',meanings:meaning.split('; '),level:lvl,pos:[],examples:[]}});
 gram[lvl]=grammar[lvl].map(([pattern,meaning,formation,ja,en,notes],i)=>({id:`starter-g-${lvl}-${i}`,pattern,meaning,formation,level:lvl,examples:[{ja,en}],notes,tags:[]}));
 kanji[lvl]=K[lvl].split('\n').map((s,i)=>{const [character,meaning,on,kun,strokes]=s.split('|');return {character,level:lvl,strokes:Number(strokes),radical:'',onyomi:on?on.split(', '):[],kunyomi:kun?kun.split(', '):[],meanings:meaning.split('; '),words:[]}});
}
const rows=[
 ['あ い う え お','a i u e o'],['か き く け こ','ka ki ku ke ko'],['さ し す せ そ','sa shi su se so'],['た ち つ て と','ta chi tsu te to'],['な に ぬ ね の','na ni nu ne no'],['は ひ ふ へ ほ','ha hi fu he ho'],['ま み む め も','ma mi mu me mo'],['や ゆ よ','ya yu yo'],['ら り る れ ろ','ra ri ru re ro'],['わ を ん','wa wo n'],
 ['が ぎ ぐ げ ご','ga gi gu ge go'],['ざ じ ず ぜ ぞ','za ji zu ze zo'],['だ ぢ づ で ど','da ji zu de do'],['ば び ぶ べ ぼ','ba bi bu be bo'],['ぱ ぴ ぷ ぺ ぽ','pa pi pu pe po'],
 ['きゃ きゅ きょ','kya kyu kyo'],['しゃ しゅ しょ','sha shu sho'],['ちゃ ちゅ ちょ','cha chu cho'],['にゃ にゅ にょ','nya nyu nyo'],['ひゃ ひゅ ひょ','hya hyu hyo'],['みゃ みゅ みょ','mya myu myo'],['りゃ りゅ りょ','rya ryu ryo'],['ぎゃ ぎゅ ぎょ','gya gyu gyo'],['じゃ じゅ じょ','ja ju jo'],['びゃ びゅ びょ','bya byu byo'],['ぴゃ ぴゅ ぴょ','pya pyu pyo']
];
function kata(s){return [...s].map(c=>{const cp=c.codePointAt(0);return cp>=0x3041&&cp<=0x3096?String.fromCodePoint(cp+0x60):c}).join('')}
const kana={hiragana:[],katakana:[]};for(const [chars,roman] of rows){const cs=chars.split(' '),rs=roman.split(' ');cs.forEach((c,i)=>{kana.hiragana.push({char:c,romaji:rs[i],group:rows.indexOf([chars,roman])});kana.katakana.push({char:kata(c),romaji:rs[i]})})}
return {vocab,kanji,grammar:gram,kana};
})();

/* Hanami V19 — comprehension-first prioritisation.
   Editorial weighting, NOT a validated word-frequency corpus. No entry is deleted. */
window.HANAMI_RECEIVE = (()=>{
 'use strict';
 const LEVELS=['N5','N4','N3','N2','N1'];
 const QUOTAS={
  vocab:{N5:520,N4:485,N3:880,N2:610,N1:450},
  grammar:{N5:81,N4:98,N3:101,N2:108,N1:93},
  kanji:{N5:84,N4:150,N3:240,N2:220,N1:170}
 };
 // These curated anchors are useful in regular conversation or recurring narrative genres.
 // The list is neither exhaustive nor claimed to be a ranked frequency dictionary.
 const spoken=`私 僕 俺 あなた 君 お前 あいつ こいつ そいつ 彼 彼女 人 みんな 誰 何 どこ どう どうして なぜ いつ どれ どっち これ それ あれ こちら そこ ここ あそこ いま 今 今日 明日 昨日 朝 昼 夜 時間 日 毎日 学校 仕事 会社 家 部屋 名前 友達 家族 母 父 兄 妹 子供 先生 学生 一緒 世界 人間 自分 他人 本当 嘘 大丈夫 無理 必要 理由 場合 事 こと もの 時 ところ 何か 誰か そんな こんな どうやって ありがとう ごめん すみません こんにちは おはよう はい いいえ うん いや ちょっと でも だから しかし そして それで もし まだ もう いつも たぶん きっと 絶対 全然 やっぱり もちろん まさか ただ だけ くらい ぐらい 少し 多い 少ない いい 悪い 好き 嫌い 怖い 強い 弱い 早い 遅い うれしい 悲しい 楽しい 難しい 簡単 新しい 古い 大きい 小さい 本当に 全部 すべて 皆 いる ある する なる 行く 来る 見る 聞く 言う 話す 読む 思う 感じる 考える 分かる 知る 知っている 忘れる 覚える 信じる 違う 出来る できる やる もらう あげる くれる 食べる 飲む 帰る 待つ 会う 使う 持つ 死ぬ 生きる 殺す 助ける 守る 逃げる 戦う 探す 見つける なくす 選ぶ 決める 変わる 変える 終わる 始まる 始める 続ける 起きる 寝る 入る 出る 歩く 走る 立つ 座る 座って 開ける 閉める 伝える 聞こえる 見える`; 
 const anime=`魔法 魔術 呪い 神 悪魔 天使 勇者 魔王 魔物 魔族 怪物 冒険 戦闘 戦争 王 王子 王女 国 国王 王国 城 騎士 剣 刀 武器 敵 味方 仲間 英雄 力 能力 特殊 力量 倒す 勝つ 負ける 殺す 死 生 命 運命 奇跡 秘密 真実 嘘 裏切り 裏切る 復讐 憎む 愛する 正義 悪 罪 罰 犯人 事件 警察 捜査 謎 目的 計画 任務 約束 契約 命令 支配 自由 選択 決断 希望 絶望 危険 安全 幸せ 願い 夢 現実 記憶 過去 未来 未来 世界 時代 異世界 転生 魂 精霊 獣 妖怪 神社 寺 妖精 修行 師匠 弟子 先輩 後輩 幼馴染 転校 恋 愛 恋人 告白 結婚 喧嘩 怒る 泣く 笑う 驚く 恥ずかしい 優しい 厳しい やばい すごい くそ ちくしょう まじ ほんと だめ しない するな やめろ 待て どけ 行け 来い やった わかった 知らない なんだと なんて まさか 仕方ない 当然 わけ 理屈 おかげ せい みたい らしい っぽい ちゃう じゃう てる てんの ってば だろう でしょう かもしれない`; 
 const daily=`電車 駅 切符 交通 車 道 乗る 降りる 遅れる 間に合う 電話 携帯 連絡 予約 受付 お金 支払い 買う 売る 値段 安い 高い 店 買い物 食事 朝ご飯 昼ご飯 晩ご飯 料理 病院 医者 病気 薬 痛い 熱 風邪 体 頭 手 目 口 耳 心 天気 雨 晴れ 風 暑い 寒い 暖かい 疲れた 忙しい 休む 休日 旅行 宿題 試験 勉強 授業 質問 答え 説明 理解 練習 間違い 正しい 問題 結果 原因 予定 準備 連絡 相談 対応 方法 大切 重要 詳しい 特別 普通 違い 同じ 似ている`; 
 const curated=new Set((spoken+' '+anime+' '+daily).split(/\s+/).filter(Boolean));
 const expression=/^(?:っ|ん|お|ご|なん|どう|まさ|ほ|や|よ|あ|な|ち|そ|こ|い|え|ぜ|だ|も|で|じ|ふ|か|く|は|が|を|に|と|て|ば|なら)/;
 const speechSense=/conversation|say|speak|feel|think|want|need|know|understand|believe|because|reason|cause|situation|always|never|perhaps|maybe|really|still|already|almost|even if|despite|unless|although|before|after|while|without|seem|look like|suppose|should|must|if |only|just|rather than|not (?:even|necessarily)|no longer|ever|used to|supposed to/i;
 const specialized=/botany|taxonom|chemistr|geolog|anatom|financial|medical|agricultur|engineering|liturgical|legal term|rarely used|obsolete/i;
 const narrative=/battle|fight|monster|king|magic|hero|betray|revenge|evil|curse|war|village|castle|sword|mystery|enemy|friend|love|death|life|truth|power|danger|promise|dream|memory|destiny|secret|world|heart/i;
 function label(t,e){return t==='vocab'?(e.word||e.reading||''):t==='grammar'?(e.pattern||''):(e.character||'')}
 function meaning(t,e){return t==='grammar'?(e.meaning||e.idea||''):Array.isArray(e.meanings)?e.meanings.join(' '):''}
 function score(t,e,level){const name=String(label(t,e)),m=String(meaning(t,e)),idx=LEVELS.indexOf(level);let n=100-idx*14;
   if(curated.has(name))n+=105;
   if(t==='grammar'){
     n+=36; if(speechSense.test(m))n+=34;
     if(/は|が|を|に|で|と|ない|なく|て|た|か|なら|ば|ので|から|けど|のに|よう|みたい|そう|らしい|わけ|こと|もの|ほど|さえ|すら|べき|しか|でも|だろ|です|ます|ろう|られる|させる/.test(name))n+=26;
   }else if(t==='vocab'){
     if(narrative.test(m))n+=23;if(speechSense.test(m))n+=13;
     if((e.pos||[]).some(p=>/verb|adverb|pronoun|particle|interjection/i.test(p)))n+=18;
     if(name.length<=3 && expression.test(name))n+=6;
   }else {if(idx<=2)n+=16;}
   if(specialized.test(m))n-=28;
   if(/archaic|classical|historical/i.test(m)&&!narrative.test(m))n-=15;
   if(!name)n-=200;
   return n;
 }
 // Cache computed rankings until a collection is replaced by a library sync.
 const cache=new WeakMap();
 function prioritized(type,level,all){if(!all?.length)return {core:[],extended:[]};const saved=cache.get(all);if(saved?.[type+'-'+level])return saved[type+'-'+level];
   const sorted=all.map((e,i)=>({e,i,s:score(type,e,level)})).sort((a,b)=>b.s-a.s||a.i-b.i);
   const cutoff=Math.min(all.length,QUOTAS[type][level]||all.length);
   const out={core:sorted.slice(0,cutoff).map(x=>x.e),extended:sorted.slice(cutoff).map(x=>x.e)};
   const next=saved||{};next[type+'-'+level]=out;cache.set(all,next);return out;
 }
 function portion(list,n){const i=(n-1)%20;return list.slice(Math.floor(i*list.length/20),Math.floor((i+1)*list.length/20));}
 return {LEVELS,QUOTAS,score,prioritized,portion,label,curatedCount:curated.size,version:'19.0'};
})();

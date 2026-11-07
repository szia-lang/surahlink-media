// Growth posts: aesthetic reminders, NO SurahLink branding.
// [[ar:key]] = Arabic pulled from the Quran dataset by word range (verse 'S:A', firstWord, lastWord, 0-based inclusive)
// [[tr:key]] = translation quote, verified against Sahih International in the dataset
// [[ref:key]] = "Surah S:A"
const fab = (top, bottom) => ({ type: 'fabric', top, bottom });
const CREAM = [236, 229, 214], WINE = [118, 28, 40], OLIVE = [86, 98, 60], NAVY = [34, 44, 74], SAND = [170, 132, 92], PLUM = [84, 40, 70];

module.exports = [
{ id: 'g-one-hardship-two-eases', bg: fab(CREAM, WINE),
  ar: { main: ['94:5', 1, 3], hard: ['94:5', 2, 2], ease: ['94:5', 3, 3] },
  tr: { main: ['94:5', 'with hardship will be ease'] },
  slides: [
    `<p>Wanna know something beautiful?</p>`,
    `<p>In Surah Ash-Sharh, Allah says it twice:</p><p>[[ar:main]]</p><p>"[[tr:main]]"</p>`,
    `<p>"The hardship" [[ar:hard]] has <i>the</i>.<br>It's the same hardship both times.</p><p>But "ease" [[ar:ease]] doesn't.<br>Scholars say they're two different eases.</p>`,
    `<p>One hardship.<br>Two eases.</p>` ],
  caption: 'one hardship, two eases 🤍', sound: 'soft vocal nasheed or slowed Quran recitation' },

{ id: 'g-you-say-this-17-times', bg: { type: 'mosque' },
  ar: { main: ['1:5', 0, 3] }, tr: { main: ['1:5', 'It is You we worship and You we ask for help'] },
  slides: [
    `<p>You say this at least 17 times a day.</p><p>Do you know what it means?</p>`,
    `<div class="big"><p>[[ar:main]]</p></div>`,
    `<p>"[[tr:main]]"</p><p class="ref">[[ref:main]]</p>`,
    `<p>In Arabic, "You" comes first.<br>Before the worship. Before the asking.</p><p>Like saying:<br>no one else. Only You.</p>` ],
  caption: 'you say it every salah. now feel it 🤍', sound: 'calm vocal-only nasheed' },

{ id: 'g-he-answers-directly', bg: { type: 'city' },
  ar: { main: ['2:186', 4, 5], qul: ['112:1', 0, 0] }, tr: { main: ['2:186', 'indeed I am near'] },
  slides: [
    `<p>Wanna know something beautiful about dua?</p>`,
    `<p>In the Quran, when people ask the Prophet ﷺ a question, Allah often tells him:</p><p>"Say..." [[ar:qul]]</p>`,
    `<p>But when they ask about Allah Himself...</p>`,
    `<p>He answers them directly:</p><p>[[ar:main]]</p><p>"Indeed, I am near."</p><p class="ref">[[ref:main]]</p>` ],
  caption: 'no "say". just: I am near 🤍', sound: 'soft rain ambience or gentle nasheed' },

{ id: 'g-i-hear-and-i-see', bg: { type: 'desert' },
  ar: { main: ['20:46', 3, 6] }, tr: { main: ['20:46', 'Indeed, I am with you both; I hear and I see'] },
  slides: [
    `<p>If you've been feeling unseen lately, read this.</p>`,
    `<p>When Allah sent Musa and Harun to Pharaoh, they were afraid.</p>`,
    `<p>He told them:</p><p>[[ar:main]]</p><p>"[[tr:main]]"</p><p class="ref">[[ref:main]]</p>`,
    `<p>He hears you too.</p>` ],
  caption: 'He hears you too 🤍', sound: 'slowed emotional nasheed' },

{ id: 'g-within-its-capacity', bg: fab(CREAM, OLIVE),
  ar: { main: ['2:286', 0, 5] }, tr: { main: ['2:286', 'Allah does not charge a soul except with that within its capacity'] },
  slides: [
    `<p>If it feels like too much right now, read this.</p>`,
    `<p>[[ar:main]]</p>`,
    `<p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>If He placed it on you,<br>He knows you can carry it.</p>` ],
  caption: 'you can carry this 🤍', sound: 'soft vocal nasheed' },

{ id: 'g-hearts-find-rest', bg: { type: 'mosque', sky: 'blue' },
  ar: { main: ['13:28', 6, 10] }, tr: { main: ['13:28', 'Unquestionably, by the remembrance of Allah hearts are assured'] },
  slides: [
    `<p>Tried everything to feel at peace?</p>`,
    `<p>There's an ayah for that.</p>`,
    `<p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>It doesn't say some hearts.<br>It says hearts.</p>` ],
  caption: 'the peace you’re looking for 🤍', sound: 'rain on window ambience' },

{ id: 'g-remember-me', bg: { type: 'city' },
  ar: { main: ['2:152', 0, 1] }, tr: { main: ['2:152', 'So remember Me; I will remember you'] },
  slides: [
    `<p>Wanna know something beautiful?</p>`,
    `<p>The One who created the heavens and the earth said:</p>`,
    `<p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>Every time you remember Him,<br>you are being remembered.</p>` ],
  caption: 'you are being remembered 🤍', sound: 'gentle vocal nasheed' },

{ id: 'g-still-my-servants', bg: fab(CREAM, NAVY),
  ar: { main: ['39:53', 1, 9], ibad: ['39:53', 1, 1] },
  tr: { main: ['39:53', 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah'] },
  slides: [
    `<p>If you think you've sinned too much to come back, read this.</p>`,
    `<p>Look how Allah speaks to people who sinned against themselves:</p>`,
    `<p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>He still calls them<br>"My servants." [[ar:ibad]]</p>` ],
  caption: 'it’s never too late to come back 🤍', sound: 'slowed emotional nasheed' },

{ id: 'g-closer-than-jugular', bg: { type: 'desert' },
  ar: { main: ['50:16', 8, 13] }, tr: { main: ['50:16', 'We are closer to him than his jugular vein'] },
  slides: [
    `<p>Feeling far from Allah?</p>`,
    `<p>He describes how close He is to you:</p>`,
    `<p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>The distance you feel<br>was never on His side.</p>` ],
  caption: 'closer than you think 🤍', sound: 'soft ambient pad, no music' },

{ id: 'g-he-is-sufficient', bg: fab(CREAM, SAND),
  ar: { main: ['65:3', 5, 10] }, tr: { main: ['65:3', 'And whoever relies upon Allah - then He is sufficient for him'] },
  slides: [
    `<p>Overthinking how it's all going to work out?</p>`,
    `<p>[[ar:main]]</p>`,
    `<p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>Not "might be."<br>He <i>is</i> sufficient.</p>` ],
  caption: 'let Him handle it 🤍', sound: 'calm vocal nasheed' },

{ id: 'g-not-forsaken', bg: { type: 'mosque' },
  ar: { main: ['93:3', 0, 4] }, tr: { main: ['93:3', 'Your Lord has not taken leave of you, nor has He detested you'] },
  slides: [
    `<p>Once, revelation paused for a while, and the Prophet ﷺ was saddened.</p>`,
    `<p>Some people even said his Lord had abandoned him.</p>`,
    `<p>Then Allah revealed:</p><p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>If you feel abandoned right now,<br>remember this ayah.</p>` ],
  caption: 'you are not forgotten 🤍', sound: 'slowed emotional nasheed' },

{ id: 'g-you-will-be-satisfied', bg: fab(CREAM, PLUM),
  ar: { main: ['93:5', 0, 3] }, tr: { main: ['93:5', 'And your Lord is going to give you, and you will be satisfied'] },
  slides: [
    `<p>For everyone still waiting on a dua.</p>`,
    `<p>[[ar:main]]</p>`,
    `<p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>Keep making dua.</p>` ],
  caption: 'for the ones still waiting 🤍', sound: 'soft vocal nasheed' },

{ id: 'g-perhaps-you-hate', bg: { type: 'city' },
  ar: { main: ['2:216', 6, 12] }, tr: { main: ['2:216', 'But perhaps you hate a thing and it is good for you'] },
  slides: [
    `<p>If something didn't work out the way you wanted...</p>`,
    `<p>[[ar:main]]</p>`,
    `<p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>He sees what you can't.</p>` ],
  caption: 'redirection, not rejection 🤍', sound: 'rain ambience' },

{ id: 'g-complain-to-allah', bg: fab(CREAM, WINE),
  ar: { main: ['12:86', 1, 6] }, tr: { main: ['12:86', 'I only complain of my suffering and my grief to Allah'] },
  slides: [
    `<p>Prophet Yaqub lost his son Yusuf for years.</p>`,
    `<p>He cried until his eyes turned white. And he said:</p>`,
    `<p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>It's okay to be sad.<br>Just take it to Him.</p>` ],
  caption: 'take it to Him 🤍', sound: 'slowed emotional nasheed' },

{ id: 'g-dua-of-yunus', bg: { type: 'desert' },
  ar: { main: ['21:87', 14, 22] },
  tr: { main: ['21:87', 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers'],
        res: ['21:88', 'So We responded to him and saved him from the distress. And thus do We save the believers'] },
  slides: [
    `<p>Prophet Yunus was in the belly of a whale, in layers of darkness.</p>`,
    `<p>He called out:</p><p>[[ar:main]]</p><p>"[[tr:main]]."</p>`,
    `<p>"[[tr:res]]."</p><p class="ref">[[ref:res]]</p>`,
    `<p>"And thus do We save the believers."<br>That includes you.</p>` ],
  caption: 'the dua from the darkness 🤍', sound: 'deep calm nasheed' },

{ id: 'g-dua-of-musa', bg: { type: 'mosque', sky: 'blue' },
  ar: { main: ['28:24', 7, 14] }, tr: { main: ['28:24', 'My Lord, indeed I am, for whatever good You would send down to me, in need'] },
  slides: [
    `<p>Musa fled his home. No money, no food, no one.</p>`,
    `<p>He sat in the shade and made this dua:</p>`,
    `<p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>Soon after, Allah gave him shelter, work and a family.</p>` ],
  caption: 'the dua for when you have nothing 🤍', sound: 'soft vocal nasheed' },

{ id: 'g-allah-is-with-us', bg: fab(CREAM, OLIVE),
  ar: { main: ['9:40', 18, 22] }, tr: { main: ['9:40', 'Do not grieve; indeed Allah is with us'] },
  slides: [
    `<p>Hiding in a cave, enemies right outside, Abu Bakr was afraid.</p>`,
    `<p>The Prophet ﷺ told him:</p>`,
    `<p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>Whatever is outside your cave right now,<br>He is with you.</p>` ],
  caption: 'Allah is with us 🤍', sound: 'calm vocal nasheed' },

{ id: 'g-if-you-are-grateful', bg: { type: 'mosque' },
  ar: { main: ['14:7', 3, 5] }, tr: { main: ['14:7', 'If you are grateful, I will surely increase you'] },
  slides: [
    `<p>A promise most people scroll past:</p>`,
    `<p>[[ar:main]]</p>`,
    `<p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>Say alhamdulillah for one thing right now.</p>` ],
  caption: 'alhamdulillah for everything 🤍', sound: 'uplifting vocal nasheed' },

{ id: 'g-call-upon-me', bg: { type: 'city' },
  ar: { main: ['40:60', 2, 4] }, tr: { main: ['40:60', 'Call upon Me; I will respond to you'] },
  slides: [
    `<p>Feel like your duas aren't being heard?</p>`,
    `<p>Allah says:</p><p>[[ar:main]]</p>`,
    `<p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>Ask. He's listening.</p>` ],
  caption: 'keep asking 🤍', sound: 'soft rain ambience' },

{ id: 'g-with-you-wherever', bg: fab(CREAM, NAVY),
  ar: { main: ['57:4', 27, 31] }, tr: { main: ['57:4', 'and He is with you wherever you are'] },
  slides: [
    `<p>New city. New job. Hospital room. Late night drive.</p>`,
    `<p>[[ar:main]]</p>`,
    `<p>"And He is with you wherever you are."</p><p class="ref">[[ref:main]]</p>`,
    `<p>Wherever.</p>` ],
  caption: 'wherever you are 🤍', sound: 'calm ambient, no music' },

{ id: 'g-with-the-patient', bg: { type: 'desert' },
  ar: { main: ['2:153', 6, 9] }, tr: { main: ['2:153', 'Indeed, Allah is with the patient'] },
  slides: [
    `<p>Being patient is exhausting sometimes.</p>`,
    `<p>But look who's with you while you wait:</p>`,
    `<p>[[ar:main]]</p><p>"[[tr:main]]."</p><p class="ref">[[ref:main]]</p>`,
    `<p>You're not waiting alone.</p>` ],
  caption: 'not waiting alone 🤍', sound: 'slowed emotional nasheed' },
];

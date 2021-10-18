/**
 * Parse lrc, suppose multiple time tag
 * @param {String} lrc_s - Format:
 * [mm:ss]lyric
 * [mm:ss.xx]lyric
 * [mm:ss.xxx]lyric
 * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
 * [mm:ss.xx]<mm:ss.xx>lyric
 *
 * @return {String} [[time, text], [time, text], [time, text], ...]
 */

/**格式化歌词 */
export function parseLyric(lrc_s) {
  let hasAdd = false;
  let hasTime = false;
  // console.log(lrc_s);
  if (lrc_s) {
    lrc_s = lrc_s.replace(/([^\]^\n])\[/g, (match, p1) => {
      return p1 + "\n[";
    });
    const lyric = lrc_s.split("\n");
    const lrc = [];
    const lyricLen = lyric.length;
    for (let i = 0; i < lyricLen; i++) {
      // match lrc time
      const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g);
      // match lrc text
      const lrcText = lyric[i]
        .replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, "")
        .replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, "")
        .replace(/^\s+|\s+$/g, "");

      if (lrcTimes) {
        // handle multiple time tag
        const timeLen = lrcTimes.length;
        for (let j = 0; j < timeLen; j++) {
          const oneTime = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(lrcTimes[j]); //返回一个数组
          const min2sec = oneTime[1] * 60;
          const sec2sec = parseInt(oneTime[2]);
          const msec2sec = oneTime[4]
            ? parseInt(oneTime[4]) /
              ((oneTime[4] + "").length === 2 ? 100 : 1000)
            : 0;
          const lrcTime = min2sec + sec2sec + msec2sec;
          lrc.push([lrcTime, lrcText]);
        }
        hasTime = true;
      } else {
        lrc.push(lrcText);
        if (!hasTime && !hasAdd && lrc.length > 1) {
          lrc.splice(0, 0, "该歌词暂不支持滚动");
          hasAdd = true;
        }
      }
    }
    // sort by time
    lrc.sort((a, b) => a[0] - b[0]);
    return lrc;
  } else {
    return [];
  }
}

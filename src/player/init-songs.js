//封装歌曲
export class Song {
  constructor(index, song, url = "", id) {
    this.index = index;
    this.name = song.name;
    this.artist = this.getAstistName(song);
    this.src = url;
    this.pic = song.pic || song.picUrl || song.al.picUrl;
    this.id = id;
  }
  getAstistName(song) {
    // console.log(song);
    if (song.artist) {
      return song.artist;
    } else if (song.ar) {
      return song.ar[0].name;
    } else if (song.song.artists) {
      return song.song.artists[0].name;
    } else {
      return "";
    }
    // switch (song) {
    //   case song.artist:
    //     return song.artist;
    //   case song.song.artists:
    //     return song.song[0].artists;
    //   case song.ar[0]:
    //     return song.ar[0].name;
    //   default:
    //     return "";
    // }
  }
}

// 用于格式化歌词
export class lyricItem {
  constructor(time, lyric) {
    this.time = time;
    this.lyric = lyric;
  }
}

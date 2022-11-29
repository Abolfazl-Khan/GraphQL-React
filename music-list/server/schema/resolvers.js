const mongoose = require('mongoose');
const graphql = require('graphql');
const SongData = mongoose.model('song');
const LyricData = mongoose.model('lyric');

exports.resolvers = {
  Query: {
    async songs() {
      try {
        const allSongs = await SongData.find({});
        return allSongs;
      } catch (error) {
        throw new graphql.GraphQLError(error);
      }
    },
    async song(_, { id }) {
      try {
        const selectedSong = await SongData.findById(id);
        return selectedSong || new graphql.GraphQLError('Song ID not found');
      } catch (error) {
        throw new graphql.GraphQLError(error);
      }
    },
    async lyric(_, { id }) {
      try {
        const selectedLyric = await LyricData.findById(id);
        return selectedLyric || new graphql.GraphQLError('Lyric ID not found');
      } catch (error) {
        throw new graphql.GraphQLError(error);
      }
    },
  },

  Mutation: {
    addSong: (parent, { title }) => {
      return new SongData({ title }).save();
    },

    addLyricToSong: (parent, { content, songId }) => {
      return SongData.addLyric(songId, content);
    },

    likeLyric: (parent, { id }) => {
      return LyricData.like(id);
    },

    deleteSong: async (parent, { id }) => {
      try {
        const result = await SongData.remove({ _id: id });
        if (result.deletedCount == 0)
          return new graphql.GraphQLError('Song not found');
        return true;
      } catch (error) {
        throw new graphql.GraphQLError(error);
      }
    },
  },

  SongType: {
    async lyrics(song) {
      try {
        const songLyrics = await SongData.findLyrics(song.id);

        return songLyrics;
      } catch (error) {
        throw new graphql.GraphQLError(error);
      }
    },
  },

  LyricType: {
    async song(lyric) {
      try {
        const selectedLyric = await LyricData.findById(lyric).populate('song'); //lyric.id?

        return selectedLyric.song;
      } catch (error) {
        throw new graphql.GraphQLError(error);
      }
    },
  },
};

exports.typeDefs = `
  type SongType {
    id: ID!
    title: String
    lyrics: [LyricType]
  }
  
  type LyricType {
    id: ID!
    likes: String
    content: String
    song:[SongType]
  }

  type Query {
    songs:[SongType]
    song(id: ID!): SongType
    lyric(id: ID!): LyricType
  }

  type Mutation {
    addSong(title: String!): SongType
    addLyricToSong(content: String, songId: ID!): SongType
    likeLyric(id: ID!): LyricType
    deleteSong(id: ID!): Boolean

  }
`;

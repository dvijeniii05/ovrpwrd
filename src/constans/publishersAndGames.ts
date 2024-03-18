export const publishersAndGames = [
  {
    key: 1,
    publisher: 'steam',
    isLinkAvailable: true,
    games: [
      { key: 1, gameName: 'dota', isAvalable: true },
      { key: 2, gameName: 'cs', isAvalable: false },
      { key: 3, gameName: 'apex', isAvalable: false },
    ],
  },
  {
    key: 2,
    publisher: 'riot',
    isLinkAvailable: false,
    games: [
      { key: 1, gameName: 'valorant', isAvalable: false },
      { key: 2, gameName: 'lol', isAvalable: false },
    ],
  },
  {
    key: 3,
    publisher: 'epic',
    isLinkAvailable: false,
    games: [{ key: 1, gameName: 'fortnite', isAvalable: false }],
  },
];

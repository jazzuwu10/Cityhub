const cinemas = [
  {
    id: 1,
    name: "PVR Nexus Mall",
    location: "Nexus Mall, Amritsar",
    lat: 31.6366,
    lng: 74.8748,
    screens: [
      {
        screenName: "Screen 1",
        shows: [
          { time: "10:00 AM", price: 150 },
          { time: "1:30 PM", price: 200 },
          { time: "7:00 PM", price: 250 }
        ]
      },
      {
        screenName: "Screen 2",
        shows: [
          { time: "11:00 AM", price: 180 },
          { time: "4:00 PM", price: 220 },
          { time: "9:30 PM", price: 300 }
        ]

      }
    ]
  },
  {
    id: 2,
    name: "INOX",
    location: "Basant Avenue",
    lat: 31.66102100310952,
    lng: 74.87811697013927
  },
  {
    id: 3,
    name: "Cinepolis",
    location: "GT Road, Amritsar",
    lat: 31.622877754345733,
    lng: 74.90626943494988
  },
];

export default cinemas;

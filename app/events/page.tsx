"use client";

export default function Events() {
  const events = [
    {
      category: "WORKSHOPS",
      items: [
        {
          title: "Graphic Design Workshop",
          date: "Jan 20, 2024",
          description:
            "Ever wondered how to create digital media from scratch using software?\nWant to broaden your horizons by communicating through visual concepts?",
          //image: ,
          link: "#", 
        },
        {
          title: "Stock Market Workshop",
          date: "Jan 29, 2023",
          description:
            "Do you ever imagine yourself as a star in the markets of the Stock Exchange and reaping sumptuous?\nIsn't it worth it to be the one, to be the billionaires?",
          //image: ,
          link: "#", 
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Title */}
      <div className="text-center mb-16 mt-16">
        <h1 className="text-6xl font-extrabold">
          Events Round The <span className="text-purple-400">Calendar</span>
        </h1>
      </div>

      {/* Events */}
      {events.map((section, id) => (
        <div key={id} className="p-6">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            {section.category}
          </h2>

          {/* Items */}
          <div className="grid md:grid-cols-2 gap-6">
            {section.items.map((item, index) => (
              <div
                key={index}
                className="p-6 flex flex-col gap-4"
              >
                {/* Image */}
                {/* Description */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-300 mb-4">{item.date}</p>
                  <p className="text-sm mb-2 whitespace-pre-line">
                    {item.description}
                  </p>
                  <a
                    href={item.link}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    Learn More &gt;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
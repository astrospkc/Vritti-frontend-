import Image from "next/image";

export default function TopicCards() {
    const cards = [
        {
            img: "/images/forest.jpg",
            title: "Navigating Life's Transitions",
            description: "Share your stories and insights on major life changes.",
        },
        {
            img: "/images/library.jpg",
            title: "Finding Balance in a Busy World",
            description: "Discuss strategies for managing stress and maintaining well-being.",
        },
        {
            img: "/images/openbooks.jpg",
            title: "The Power of Gratitude",
            description: "Explore the practice of gratitude and its impact on your life.",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-6 max-w-full">
            {cards.map((card, idx) => (
                <div
                    key={idx}
                    className="w-72 bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-shadow duration-500 ease-in-out"
                >
                    {/* Image */}
                    <Image src={card.img} alt={card.title} width={200} height={200} className="h-40 w-full object-cover" />

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{card.description}</p>

                        {/* Accent Line */}
                        {idx === 1 && (
                            <div className="w-6 h-1 bg-pink-400 mt-3 mx-auto rounded transition-all duration-700"></div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

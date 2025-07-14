export default function SpotlightMembers() {
  const members = [
    {
      name: "Isabella Green",
      role: "Author of 'The Silent Sea'",
      image: "img/member.jpg",
      badge: "🔥 Featured Author",
    },
    {
      name: "Noah Kim",
      role: "Top Reader - 120 books",
      image: "img/author.jpg",
      badge: "🏆 Book Master",
    },
    {
      name: "Aria Thompson",
      role: "Author of 'DreamLight'",
      image: "img/member2.jpg",
      badge: "✨ Rising Star",
    },
    {
      name: "Liam Carter",
      role: "Top Purchaser - July",
      image: "img/author.jpg",
      badge: "💎 VIP Member",
    },
  ];

  return (
    <div className="homepage spotlight-section">
      <h2 className="section-title">Spotlight Members</h2>
      <div className="spotlight-grid">
        {members.map((member, index) => (
          <div key={index} className="spotlight-card">
            <div className="image-wrapper">
              <img src={member.image} alt={member.name} />
              <span className="badge">{member.badge}</span>
            </div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Full React App: Privilege for Sale with Landing Page, Pie Wheel, and Search
// Libraries: React, Tailwind CSS

import React, { useState, useEffect } from 'react';

// Team definitions with starting balances
const teams = { Grizzly: 500, Eagle: 300, Salmon: 150, Wolf: 50 };

// Privilege data (comprehensive list)
const privilegesData = [
  { id: 1, category: "Educational Access and Equity", privilege: "Equitable admission processes", description: "Streamlined and unbiased admissions.", cost: 15 },
  { id: 2, category: "Educational Access and Equity", privilege: "Access to culturally relevant curricula and Indigenous epistemologies", description: "Curricula that reflect Indigenous worldviews.", cost: 20 },
  { id: 3, category: "Educational Access and Equity", privilege: "Comprehensive financial aid and scholarships", description: "Bursaries covering tuition and living costs.", cost: 25 },
  { id: 4, category: "Educational Access and Equity", privilege: "Accessible education infrastructure for students with disabilities", description: "Ramps, elevators, adaptive technology.", cost: 20 },
  { id: 5, category: "Educational Access and Equity", privilege: "Quality and accessible digital learning resources", description: "Free e-books, journals, LMS access.", cost: 15 },
  { id: 6, category: "Language and Cultural Supports", privilege: "First-language instruction programs", description: "Courses taught in Indigenous languages.", cost: 30 },
  { id: 7, category: "Language and Cultural Supports", privilege: "Indigenous language immersion opportunities", description: "Full-time immersion courses.", cost: 35 },
  { id: 8, category: "Language and Cultural Supports", privilege: "Access to language revitalization funding", description: "Grants for community language projects.", cost: 25 },
  { id: 9, category: "Curriculum and Research", privilege: "Priority funding for Indigenous-led research", description: "Research grants led by Indigenous scholars.", cost: 40 },
  { id: 10, category: "Curriculum and Research", privilege: "Inclusion in curriculum development bodies", description: "Seats on decision-making committees.", cost: 30 },
  { id: 11, category: "Community Engagement", privilege: "Guaranteed seats for Elders advisory councils", description: "Elders consulted in program design.", cost: 20 },
  { id: 12, category: "Community Engagement", privilege: "Funding for community-based learning exchanges", description: "Travel and stipends for exchanges.", cost: 25 },
  { id: 13, category: "Support Services", privilege: "Holistic mental health services", description: "Culturally safe counseling.", cost: 30 },
  { id: 14, category: "Support Services", privilege: "On-campus childcare for parents", description: "Affordable childcare centers.", cost: 20 },
  { id: 15, category: "Support Services", privilege: "Career mentorship programs with leaders", description: "One-on-one mentorships.", cost: 25 },
  { id: 16, category: "Accessibility", privilege: "Accessible transportation stipends", description: "Subsidies for travel.", cost: 15 },
  { id: 17, category: "Accessibility", privilege: "Adaptive technology grants", description: "Devices like screen readers.", cost: 20 },
  { id: 18, category: "Accessibility", privilege: "Flexible course scheduling options", description: "Evening and weekend classes.", cost: 10 },
  { id: 19, category: "Financial Equity", privilege: "Debt forgiveness initiatives", description: "Loan forgiveness programs.", cost: 50 },
  { id: 20, category: "Financial Equity", privilege: "Low-interest student loans", description: "Reduced interest loan plans.", cost: 30 },
  { id: 21, category: "Financial Equity", privilege: "Emergency housing bursaries", description: "Grants for housing crises.", cost: 25 },
  { id: 22, category: "Technology", privilege: "Free laptop programs", description: "Laptops for all students.", cost: 20 },
  { id: 23, category: "Technology", privilege: "Campus-wide high-speed internet", description: "Unlimited data campus access.", cost: 15 },
  { id: 24, category: "Technology", privilege: "Access to digital research libraries", description: "Premium library databases.", cost: 25 },
  { id: 25, category: "Policy Influence", privilege: "Voting representation on governance boards", description: "Seats with voting rights.", cost: 40 },
  { id: 26, category: "Policy Influence", privilege: "Proposal power for curriculum changes", description: "Submit formal proposals.", cost: 35 },
  { id: 27, category: "Policy Influence", privilege: "Guaranteed consultation on policy reviews", description: "Mandatory community consultations.", cost: 30 },
  { id: 28, category: "Networking", privilege: "Access to professional conferences", description: "Conference passes.", cost: 25 },
  { id: 29, category: "Networking", privilege: "Exclusive alumni mentorship networks", description: "Private alumni groups.", cost: 20 },
  { id: 30, category: "Networking", privilege: "Priority interview placements", description: "Fast-track recruitments.", cost: 30 },
  { id: 31, category: "Well-being", privilege: "Nutritional meal plans", description: "Subsidized healthy meals.", cost: 15 },
  { id: 32, category: "Well-being", privilege: "Recreation and wellness center access", description: "Free gym and classes.", cost: 20 },
  { id: 33, category: "Well-being", privilege: "Spiritual care services", description: "Chaplain and Elder support.", cost: 25 },
  { id: 34, category: "Safety", privilege: "24/7 campus security escort service", description: "On-demand escorts.", cost: 10 },
  { id: 35, category: "Safety", privilege: "Gender-inclusive safe spaces", description: "All-gender restrooms.", cost: 15 },
  { id: 36, category: "Safety", privilege: "Emergency alert systems", description: "Text and app alerts.", cost: 10 },
  { id: 37, category: "Housing", privilege: "Priority on-campus housing", description: "Guaranteed dorm rooms.", cost: 30 },
  { id: 38, category: "Housing", privilege: "Subsidized community housing", description: "Reduced-rate housing.", cost: 25 },
  { id: 39, category: "Transportation", privilege: "Free public transit passes", description: "Unlimited public transit.", cost: 20 },
  { id: 40, category: "Transportation", privilege: "On-campus bike-share program", description: "Free bike rentals.", cost: 15 }
];

// Scenario data (8 detailed scenarios)
const scenariosData = [
  { id: 1, scenario: "Funding Cutbacks", description: "Provincial or federal educational funding is drastically reduced. How do you reprioritize your remaining resources?", effectType: "subtract", amount: 92 },
  { id: 2, scenario: "Systemic Bias Exposed", description: "An internal review reveals deep-rooted systemic biases in program admissions. Will your group allocate resources to address these findings?", effectType: "subtract", amount: 96 },
  { id: 3, scenario: "Economic Recession", description: "An economic downturn severely reduces employment opportunities for graduates. Determine how this impacts your group's allocation of resources.", effectType: "subtract", amount: 84 },
  { id: 4, scenario: "Natural Disaster", description: "A major natural disaster has caused significant campus damage and increased support demands. How will you respond?", effectType: "subtract", amount: 84 },
  { id: 5, scenario: "Health Crisis", description: "A pandemic severely disrupts campus operations and health services. Determine the financial and human resources needed.", effectType: "subtract", amount: 97 },
  { id: 6, scenario: "Grant Secured", description: "Your team secures unexpected grant funding earmarked for equity initiatives. How will you spend it?", effectType: "add", amount: 84 },
  { id: 7, scenario: "Policy Shift", description: "New government policies change financial aid structures in your favor. Allocate the additional resources.", effectType: "add", amount: 80 },
  { id: 8, scenario: "Ally Donation", description: "A community ally donates resources to support your cause. Decide which privilege to fund next.", effectType: "add", amount: 40 }
];

// PieWheel component renders a spinning SVG pie chart
const PieWheel = ({ scenarios, rotation }) => {
  const size = 300;
  const radius = size / 2;
  const angleStep = (2 * Math.PI) / scenarios.length;

  const slices = scenarios.map((s, i) => {
    const start = i * angleStep - Math.PI / 2;
    const end = start + angleStep;
    const x1 = radius + radius * Math.cos(start);
    const y1 = radius + radius * Math.sin(start);
    const x2 = radius + radius * Math.cos(end);
    const y2 = radius + radius * Math.sin(end);
    const path = `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 0 1 ${x2},${y2} Z`;
    const hue = (i / scenarios.length) * 360;
    return <path key={s.id} d={path} fill={`hsl(${hue},70%,60%)`} stroke="#fff" strokeWidth="2" />;
  });

  return (
    <svg width={size} height={size} className="mx-auto">
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${radius}px ${radius}px`,
          transition: 'transform 4s ease-out'
        }}
      >
        {slices}
      </g>
      <line x1={radius} y1={0} x2={radius - 10} y2={20} stroke="#333" strokeWidth={4} />
    </svg>
  );
};

// Landing page with VUCA logo and user instructions
// Landing page with VUCA logo and reflective questions
const LandingPage = ({ onStart }) => (
  <div className="flex flex-col items-center p-8 space-y-6">
    <img src="/assets/vuca-logo.png" alt="VUCA Logo" className="w-32" />
    <h1 className="text-4xl font-bold">Privilege for Sale: Higher Education Edition</h1>
    <p className="max-w-2xl text-center">
      This interactive simulation invites you to explore how systemic inequities shape access to resources in higher education.
      Before entering, consider the following questions:
    </p>
    <div className="max-w-md text-left space-y-2">
      <h2 className="text-2xl font-semibold mb-2">Reflective Questions</h2>
      <ul className="list-disc list-inside text-sm space-y-1">
        <li>What assumptions do I hold about fairness and meritocracy in education?</li>
        <li>How might historical and structural factors influence the starting resources of different groups?</li>
        <li>In what ways do privilege and access shape individual and community outcomes?</li>
        <li>How will I respond when faced with unexpected challenges that affect my resources?</li>
      </ul>
    </div>
    <button
      onClick={onStart}
      className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
    >
      I’m ready to engage
    </button>
  </div>
);

const App = () => {
  const [stage, setStage] = useState('landing'); // 'landing' | 'team' | 'game'
  const [team, setTeam] = useState(null);
  const [balance, setBalance] = useState(0);
  const [privileges, setPrivileges] = useState([]);
  const [cart, setCart] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPrivileges(privilegesData);
    setScenarios(scenariosData);
  }, []);

  const startGame = () => setStage('team');

  const assignTeam = (t) => {
    setTeam(t);
    setBalance(teams[t]);
    setStage('game');
  };

  const buyPrivilege = (item) => {
    if (balance >= item.cost) {
      setCart(prev => [...prev, item]);
      setPrivileges(prev => prev.filter(x => x.id !== item.id));
      setBalance(prev => prev - item.cost);
    }
  };

  const removePrivilege = (item) => {
    setCart(prev => prev.filter(x => x.id !== item.id));
    setPrivileges(prev => [...prev, item]);
    setBalance(prev => prev + item.cost);
  };

  const spinWheel = () => {
    if (scenarios.length === 0) return;
    const idx = Math.floor(Math.random() * scenarios.length);
    const spins = 3;
    const sliceAngle = 360 / scenarios.length;
    const target = spins * 360 + idx * sliceAngle + sliceAngle / 2;
    setRotation(prev => prev + target);
    setTimeout(() => {
      const sel = scenarios[idx];
      if (sel && typeof sel.effectType === 'string' && typeof sel.amount === 'number') {
        setCurrentScenario(sel);
        setBalance(prev => prev + (sel.effectType === 'add' ? sel.amount : -sel.amount));
      } else {
        console.warn('Invalid scenario selected:', sel);
      }
    }, 4000);
  };

  if (stage === 'landing') return <LandingPage onStart={startGame} />;

  if (stage === 'team') {
    return (
      <div className="p-4">
        <h2 className="text-2xl mb-4">Choose Your Team</h2>
        <div className="flex space-x-4">
          {Object.keys(teams).map(t => (
            <button
              key={t}
              onClick={() => assignTeam(t)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Main game interface
  return (
    <div className="p-4">
      <header className="flex justify-between mb-4">
        <div>Team: <strong>{team}</strong></div>
      </header>

      <section className="mb-6 text-center">
        <PieWheel scenarios={scenarios} rotation={rotation} />
        <button
          onClick={spinWheel}
          className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Spin Scenario Wheel
        </button>
        {currentScenario && (
          <div className="mt-4 p-3 border rounded-lg bg-gray-50">
            <h3 className="font-bold">{currentScenario.scenario}</h3>
            <p className="italic">{currentScenario.description}</p>
            <p>Impact: {currentScenario.effectType === 'add' ? '+' : '-'}${currentScenario.amount}</p>
          </div>
        )}
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-2">Available Privileges</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search privileges..."
            className="mb-2 p-2 border rounded w-full"
          />
          <div className="space-y-2 max-h-[400px] overflow-auto">
            {privileges
              .filter(p => p.privilege.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(p => (
                <div
                  key={p.id}
                  className="border p-2 rounded flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{p.privilege}</h4>
                    <span className="text-sm">${p.cost}</span>
                  </div>
                  <button
                    onClick={() => buyPrivilege(p)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Buy
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Shopping Cart</h2>
          <div className="mb-2 text-lg font-semibold">Balance: ${balance}</div>
          <div className="space-y-2 max-h-[400px] overflow-auto">
            {cart.length > 0 ? cart.map(c => (
              <div
                key={c.id}
                className="border p-2 rounded flex justify-between items-center"
              >
                <span>{c.privilege} - ${c.cost}</span>
                <button
                  onClick={() => removePrivilege(c)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            )) : <p className="italic">No items in cart.</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;

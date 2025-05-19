import { NextResponse } from 'next/server';

interface Airport {
  iata: string;
  name: string;
  city: string;
  country: string;
}

const airports: Airport[] = [
  // Major African Airports
  { iata: 'JNB', name: 'O.R. Tambo International Airport', city: 'Johannesburg', country: 'South Africa' },
  { iata: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa' },
  { iata: 'CAI', name: 'Cairo International Airport', city: 'Cairo', country: 'Egypt' },
  { iata: 'NBO', name: 'Jomo Kenyatta International Airport', city: 'Nairobi', country: 'Kenya' },
  { iata: 'LOS', name: 'Murtala Muhammed International Airport', city: 'Lagos', country: 'Nigeria' },
  { iata: 'ADD', name: 'Bole International Airport', city: 'Addis Ababa', country: 'Ethiopia' },
  { iata: 'DUR', name: 'King Shaka International Airport', city: 'Durban', country: 'South Africa' },
  { iata: 'DAR', name: 'Julius Nyerere International Airport', city: 'Dar es Salaam', country: 'Tanzania' },
  { iata: 'ACC', name: 'Kotoka International Airport', city: 'Accra', country: 'Ghana' },
  { iata: 'ABJ', name: 'Félix-Houphouët-Boigny International Airport', city: 'Abidjan', country: 'Ivory Coast' },
  { iata: 'CMN', name: 'Mohammed V International Airport', city: 'Casablanca', country: 'Morocco' },
  { iata: 'ALG', name: 'Houari Boumediene Airport', city: 'Algiers', country: 'Algeria' },
  { iata: 'KRT', name: 'Khartoum International Airport', city: 'Khartoum', country: 'Sudan' },
  { iata: 'TUN', name: 'Carthage International Airport', city: 'Tunis', country: 'Tunisia' },
  { iata: 'LUN', name: 'Kenneth Kaunda International Airport', city: 'Lusaka', country: 'Zambia' },
  { iata: 'HRE', name: 'Robert Gabriel Mugabe International Airport', city: 'Harare', country: 'Zimbabwe' },
  { iata: 'MPM', name: 'Maputo International Airport', city: 'Maputo', country: 'Mozambique' },
  { iata: 'LAD', name: 'Quatro de Fevereiro International Airport', city: 'Luanda', country: 'Angola' },
  { iata: 'DKR', name: 'Blaise Diagne International Airport', city: 'Dakar', country: 'Senegal' },
  { iata: 'EBB', name: 'Entebbe International Airport', city: 'Entebbe', country: 'Uganda' },
  // Regional African Airports
  { iata: 'MQP', name: 'Kruger Mpumalanga International Airport', city: 'Nelspruit', country: 'South Africa' },
  { iata: 'GBE', name: 'Sir Seretse Khama International Airport', city: 'Gaborone', country: 'Botswana' },
  { iata: 'WDH', name: 'Hosea Kutako International Airport', city: 'Windhoek', country: 'Namibia' },
  { iata: 'LLW', name: 'Lilongwe International Airport', city: 'Lilongwe', country: 'Malawi' },
  { iata: 'BZV', name: 'Maya-Maya Airport', city: 'Brazzaville', country: 'Republic of the Congo' },
  { iata: 'KGL', name: 'Kigali International Airport', city: 'Kigali', country: 'Rwanda' },
  { iata: 'BJM', name: 'Bujumbura International Airport', city: 'Bujumbura', country: 'Burundi' },
  { iata: 'MRU', name: 'Sir Seewoosagur Ramgoolam International Airport', city: 'Port Louis', country: 'Mauritius' },
  { iata: 'SEZ', name: 'Seychelles International Airport', city: 'Victoria', country: 'Seychelles' },
  { iata: 'TNR', name: 'Ivato International Airport', city: 'Antananarivo', country: 'Madagascar' },
  
  // Major European Airports
  { iata: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom' },
  // Regional European Airports
  { iata: 'BHX', name: 'Birmingham Airport', city: 'Birmingham', country: 'United Kingdom' },
  { iata: 'EDI', name: 'Edinburgh Airport', city: 'Edinburgh', country: 'United Kingdom' },
  { iata: 'BRS', name: 'Bristol Airport', city: 'Bristol', country: 'United Kingdom' },
  { iata: 'NCE', name: "Nice Côte d'Azur Airport", city: 'Nice', country: 'France' },
  { iata: 'TLS', name: 'Toulouse-Blagnac Airport', city: 'Toulouse', country: 'France' },
  { iata: 'HAM', name: 'Hamburg Airport', city: 'Hamburg', country: 'Germany' },
  { iata: 'STR', name: 'Stuttgart Airport', city: 'Stuttgart', country: 'Germany' },
  { iata: 'VCE', name: 'Venice Marco Polo Airport', city: 'Venice', country: 'Italy' },
  { iata: 'NAP', name: 'Naples International Airport', city: 'Naples', country: 'Italy' },
  { iata: 'PMI', name: 'Palma de Mallorca Airport', city: 'Palma de Mallorca', country: 'Spain' },
  { iata: 'AGP', name: 'Málaga Airport', city: 'Málaga', country: 'Spain' },
  { iata: 'OPO', name: 'Francisco Sá Carneiro Airport', city: 'Porto', country: 'Portugal' },
  { iata: 'FAO', name: 'Faro Airport', city: 'Faro', country: 'Portugal' },
  { iata: 'FNC', name: 'Cristiano Ronaldo International Airport', city: 'Funchal', country: 'Portugal' },
  { iata: 'PDL', name: 'João Paulo II Airport', city: 'Ponta Delgada', country: 'Portugal' },
  { iata: 'HOR', name: 'Horta Airport', city: 'Horta', country: 'Portugal' },
  { iata: 'TER', name: 'Lajes Airport', city: 'Terceira Island', country: 'Portugal' },
  { iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { iata: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { iata: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { iata: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
  { iata: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', city: 'Madrid', country: 'Spain' },
  { iata: 'FCO', name: 'Leonardo da Vinci International Airport', city: 'Rome', country: 'Italy' },
  { iata: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
  { iata: 'BCN', name: 'Barcelona–El Prat Airport', city: 'Barcelona', country: 'Spain' },
  { iata: 'LGW', name: 'London Gatwick Airport', city: 'London', country: 'United Kingdom' },

  // Major North American Airports
  { iata: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
  // Regional North American Airports
  { iata: 'BTV', name: 'Burlington International Airport', city: 'Burlington', country: 'United States' },
  { iata: 'PWM', name: 'Portland International Jetport', city: 'Portland', country: 'United States' },
  { iata: 'SYR', name: 'Syracuse Hancock International Airport', city: 'Syracuse', country: 'United States' },
  { iata: 'ROC', name: 'Greater Rochester International Airport', city: 'Rochester', country: 'United States' },
  { iata: 'CHS', name: 'Charleston International Airport', city: 'Charleston', country: 'United States' },
  { iata: 'SAV', name: 'Savannah/Hilton Head International Airport', city: 'Savannah', country: 'United States' },
  { iata: 'PVD', name: 'T. F. Green Airport', city: 'Providence', country: 'United States' },
  { iata: 'YQB', name: 'Québec City Jean Lesage International Airport', city: 'Québec City', country: 'Canada' },
  { iata: 'YHZ', name: 'Halifax Stanfield International Airport', city: 'Halifax', country: 'Canada' },
  { iata: 'YQR', name: 'Regina International Airport', city: 'Regina', country: 'Canada' },
  { iata: 'YXE', name: 'Saskatoon John G. Diefenbaker International Airport', city: 'Saskatoon', country: 'Canada' },
  { iata: 'GDL', name: 'Guadalajara International Airport', city: 'Guadalajara', country: 'Mexico' },
  { iata: 'MTY', name: 'Monterrey International Airport', city: 'Monterrey', country: 'Mexico' },
  { iata: 'CUN', name: 'Cancún International Airport', city: 'Cancún', country: 'Mexico' },
  { iata: 'TIJ', name: 'Tijuana International Airport', city: 'Tijuana', country: 'Mexico' },
  { iata: 'SJD', name: 'Los Cabos International Airport', city: 'San José del Cabo', country: 'Mexico' },
  { iata: 'PVR', name: 'Licenciado Gustavo Díaz Ordaz International Airport', city: 'Puerto Vallarta', country: 'Mexico' },
  { iata: 'MZT', name: 'General Rafael Buelna International Airport', city: 'Mazatlán', country: 'Mexico' },
  { iata: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
  { iata: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'United States' },
  { iata: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States' },
  { iata: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States' },
  { iata: 'ATL', name: 'Hartsfield–Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States' },
  { iata: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States' },
  { iata: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States' },
  { iata: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
  { iata: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada' },
  { iata: 'YVR', name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada' },
  { iata: 'MEX', name: 'Benito Juárez International Airport', city: 'Mexico City', country: 'Mexico' },

  // Major Asian Airports
  { iata: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China' },
  { iata: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { iata: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
  { iata: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { iata: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
  { iata: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'China' },
  { iata: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
  { iata: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' },
  { iata: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
  { iata: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
  { iata: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
  { iata: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India' },
  { iata: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
  { iata: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata', country: 'India' },
  { iata: 'COK', name: 'Cochin International Airport', city: 'Kochi', country: 'India' },
  { iata: 'GOI', name: 'Dabolim Airport', city: 'Goa', country: 'India' },
  { iata: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport', city: 'Ahmedabad', country: 'India' },

  // Major South American Airports
  { iata: 'GRU', name: 'São Paulo/Guarulhos International Airport', city: 'São Paulo', country: 'Brazil' },
  { iata: 'EZE', name: 'Ministro Pistarini International Airport', city: 'Buenos Aires', country: 'Argentina' },
  { iata: 'BOG', name: 'El Dorado International Airport', city: 'Bogotá', country: 'Colombia' },
  { iata: 'SCL', name: 'Arturo Merino Benítez International Airport', city: 'Santiago', country: 'Chile' },
  { iata: 'LIM', name: 'Jorge Chávez International Airport', city: 'Lima', country: 'Peru' },
  { iata: 'GIG', name: 'Rio de Janeiro/Galeão International Airport', city: 'Rio de Janeiro', country: 'Brazil' },
  { iata: 'CNF', name: 'Tancredo Neves International Airport', city: 'Belo Horizonte', country: 'Brazil' },
  { iata: 'POA', name: 'Salgado Filho International Airport', city: 'Porto Alegre', country: 'Brazil' },
  { iata: 'REC', name: 'Guararapes–Gilberto Freyre International Airport', city: 'Recife', country: 'Brazil' },
  { iata: 'SSA', name: 'Deputado Luís Eduardo Magalhães International Airport', city: 'Salvador', country: 'Brazil' },
  { iata: 'COR', name: 'Ingeniero Aeronáutico Ambrosio L.V. Taravella International Airport', city: 'Córdoba', country: 'Argentina' },
  { iata: 'MDZ', name: 'El Plumerillo Airport', city: 'Mendoza', country: 'Argentina' },
  { iata: 'BRC', name: 'San Carlos de Bariloche Airport', city: 'San Carlos de Bariloche', country: 'Argentina' },
  { iata: 'MDE', name: 'José María Córdova International Airport', city: 'Medellín', country: 'Colombia' },
  { iata: 'CLO', name: 'Alfonso Bonilla Aragón International Airport', city: 'Cali', country: 'Colombia' },
  { iata: 'CTG', name: 'Rafael Núñez International Airport', city: 'Cartagena', country: 'Colombia' },

  // Major Oceania Airports
  { iata: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  { iata: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
  { iata: 'BNE', name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia' },
  { iata: 'PER', name: 'Perth Airport', city: 'Perth', country: 'Australia' },
  { iata: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'New Zealand' },
  { iata: 'CHC', name: 'Christchurch International Airport', city: 'Christchurch', country: 'New Zealand' },
  { iata: 'WLG', name: 'Wellington International Airport', city: 'Wellington', country: 'New Zealand' },
  { iata: 'ZQN', name: 'Queenstown Airport', city: 'Queenstown', country: 'New Zealand' },
  { iata: 'DUD', name: 'Dunedin Airport', city: 'Dunedin', country: 'New Zealand' },
  { iata: 'ADL', name: 'Adelaide Airport', city: 'Adelaide', country: 'Australia' },
  { iata: 'OOL', name: 'Gold Coast Airport', city: 'Gold Coast', country: 'Australia' },
  { iata: 'CNS', name: 'Cairns Airport', city: 'Cairns', country: 'Australia' },
  { iata: 'DRW', name: 'Darwin International Airport', city: 'Darwin', country: 'Australia' },
  { iata: 'HBA', name: 'Hobart International Airport', city: 'Hobart', country: 'Australia' },
  { iata: 'NAN', name: 'Nadi International Airport', city: 'Nadi', country: 'Fiji' },
  { iata: 'PPT', name: 'Faa\'a International Airport', city: 'Papeete', country: 'French Polynesia' },
  { iata: 'GUM', name: 'Antonio B. Won Pat International Airport', city: 'Hagåtña', country: 'Guam' },
  { iata: 'APW', name: 'Faleolo International Airport', city: 'Apia', country: 'Samoa' },
  { iata: 'VLI', name: 'Bauerfield International Airport', city: 'Port Vila', country: 'Vanuatu' },
  { iata: 'TBU', name: 'Fua\'amotu International Airport', city: 'Nukuʻalofa', country: 'Tonga' },
  
  // Caribbean Airports
  { iata: 'NAS', name: 'Lynden Pindling International Airport', city: 'Nassau', country: 'Bahamas' },
  { iata: 'GCM', name: 'Owen Roberts International Airport', city: 'George Town', country: 'Cayman Islands' },
  { iata: 'MBJ', name: 'Sangster International Airport', city: 'Montego Bay', country: 'Jamaica' },
  { iata: 'KIN', name: 'Norman Manley International Airport', city: 'Kingston', country: 'Jamaica' },
  { iata: 'ANU', name: 'V. C. Bird International Airport', city: 'St. John\'s', country: 'Antigua and Barbuda' },
  { iata: 'BGI', name: 'Grantley Adams International Airport', city: 'Bridgetown', country: 'Barbados' },
  { iata: 'POS', name: 'Piarco International Airport', city: 'Port of Spain', country: 'Trinidad and Tobago' },
  { iata: 'SJU', name: 'Luis Muñoz Marín International Airport', city: 'San Juan', country: 'Puerto Rico' },
  { iata: 'STT', name: 'Cyril E. King Airport', city: 'Charlotte Amalie', country: 'U.S. Virgin Islands' },
  { iata: 'PTP', name: 'Pointe-à-Pitre International Airport', city: 'Pointe-à-Pitre', country: 'Guadeloupe' }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  const filteredAirports = airports.filter(airport => {
    const searchTerms = query.split(/\s+/);
    const searchString = `${airport.city} ${airport.country} ${airport.name} ${airport.iata}`.toLowerCase();
    
    return searchTerms.every(term => {
      // Check for exact IATA code match (case insensitive)
      if (term.length === 3) {
        if (airport.iata.toLowerCase() === term) return true;
      }
      
      // Check if the term matches the beginning of any word in the search string
      return searchString.split(/\s+/).some(word => word.startsWith(term));
    });
  });

  return NextResponse.json(filteredAirports);
}
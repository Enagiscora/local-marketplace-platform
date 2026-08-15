// Nigeria states and their Local Government Areas (LGAs).
// Used for the hierarchical location selector during onboarding.

export const STATES_LGAS: Record<string, string[]> = {
  Abia: ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Osisioma', 'Umuahia North', 'Umuahia South'],
  Adamawa: ['Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Jada', 'Mubi North', 'Mubi South', 'Numan', 'Yola North', 'Yola South'],
  'Akwa Ibom': ['Abak', 'Eket', 'Ikot Ekpene', 'Itu', 'Oron', 'Uyo', 'Nsit Ibom', 'Etinan', 'Ibiono Ibom'],
  Anambra: ['Aguata', 'Awka North', 'Awka South', 'Idemili North', 'Idemili South', 'Nnewi North', 'Nnewi South', 'Onitsha North', 'Onitsha South'],
  Bauchi: ['Bauchi', 'Azare', 'Katagum', 'Misau', 'Jamaare', 'Tafawa Balewa', 'Toro', 'Alkaleri', 'Ningi'],
  Bayelsa: ['Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa'],
  Benue: ['Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala', 'Vandeikya', 'Gwer East', 'Gwer West', 'Ushongo'],
  Borno: ['Maiduguri', 'Jere', 'Konduga', 'Bama', 'Biu', 'Dikwa', 'Gwoza', 'Monguno'],
  'Cross River': ['Calabar Municipal', 'Calabar South', 'Akamkpa', 'Ikom', 'Obudu', 'Ogoja', 'Odukpani', 'Ugep'],
  Delta: ['Warri South', 'Warri North', 'Uvwie', 'Sapele', 'Ughelli North', 'Ughelli South', 'Oshimili South', 'Aniocha North'],
  Ebonyi: ['Abakaliki', 'Afikpo North', 'Afikpo South', 'Ezza North', 'Ezza South', 'Ikwo', 'Ishielu', 'Ohaozara'],
  Edo: ['Oredo', 'Egor', 'Ikpoba-Okha', 'Ovia North-East', 'Ovia South-West', 'Uhunmwonde', 'Esan West', 'Etsako West'],
  Ekiti: ['Ado Ekiti', 'Ikere', 'Ikole', 'Oye', 'Efon', 'Emure', 'Gbonyin', 'Ijero'],
  Enugu: ['Enugu East', 'Enugu North', 'Enugu South', 'Nsukka', 'Udi', 'Igbo-Etiti', 'Oji River', 'Awgu'],
  'FCT - Abuja': ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council (AMAC)'],
  Gombe: ['Gombe', 'Billiri', 'Dukku', 'Kaltungo', 'Yamaltu/Deba', 'Akko', 'Balanga', 'Funakaye'],
  Imo: ['Owerri Municipal', 'Owerri North', 'Owerri West', 'Orlu', 'Okigwe', 'Mbaitoli', 'Ohaji/Egbema', 'Ikeduru'],
  Jigawa: ['Dutse', 'Hadejia', 'Gumel', 'Kazaure', 'Ringim', 'Birnin Kudu', 'Gwaram', 'Kafin Hausa'],
  Kaduna: ['Kaduna North', 'Kaduna South', 'Chikun', 'Igabi', 'Zaria', 'Sabon Gari', 'Kachia', 'Kagarko'],
  Kano: ['Kano Municipal', 'Nassarawa', 'Fagge', 'Dala', 'Gwale', 'Tarauni', 'Ungogo', 'Kumbotso', 'Dawakin Tofa'],
  Katsina: ['Katsina', 'Daura', 'Funtua', 'Malumfashi', 'Dutsin-Ma', 'Kankia', 'Bakori', 'Batsari'],
  Kebbi: ['Birnin Kebbi', 'Argungu', 'Yauri', 'Zuru', 'Jega', 'Gwandu', 'Bunza', 'Aliero'],
  Kogi: ['Lokoja', 'Okene', 'Kabba/Bunu', 'Idah', 'Ankpa', 'Dekina', 'Ijumu', 'Yagba East'],
  Kwara: ['Ilorin East', 'Ilorin South', 'Ilorin West', 'Offa', 'Omu-Aran', 'Patigi', 'Baruten', 'Edu'],
  Lagos: ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'],
  Nasarawa: ['Lafia', 'Karu', 'Keffi', 'Akwanga', 'Nasarawa', 'Doma', 'Wamba', 'Toto'],
  Niger: ['Minna (Chanchaga)', 'Bosso', 'Suleja', 'Bida', 'Kontagora', 'Lapai', 'Agaie', 'Mokwa'],
  Ogun: ['Abeokuta North', 'Abeokuta South', 'Ijebu Ode', 'Ijebu North', 'Sagamu', 'Ifo', 'Ado-Odo/Ota', 'Ewekoro'],
  Ondo: ['Akure North', 'Akure South', 'Ondo West', 'Ondo East', 'Owo', 'Ikare (Akoko North-East)', 'Idanre', 'Ilaje'],
  Osun: ['Osogbo', 'Olorunda', 'Ife Central', 'Ife East', 'Ilesa East', 'Ilesa West', 'Ede North', 'Iwo'],
  Oyo: ['Ibadan North', 'Ibadan North-East', 'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West', 'Ogbomosho North', 'Oyo East', 'Iseyin', 'Saki West'],
  Plateau: ['Jos North', 'Jos South', 'Jos East', 'Barkin Ladi', 'Bassa', 'Pankshin', 'Langtang North', 'Mangu'],
  Rivers: ['Port Harcourt', 'Obio/Akpor', 'Okrika', 'Eleme', 'Ikwerre', 'Emohua', 'Oyigbo', 'Degema', 'Bonny'],
  Sokoto: ['Sokoto North', 'Sokoto South', 'Wamako', 'Bodinga', 'Tambuwal', 'Gwadabawa', 'Illela', 'Kware'],
  Taraba: ['Jalingo', 'Wukari', 'Bali', 'Gembu (Sardauna)', 'Takum', 'Zing', 'Ibi', 'Gassol'],
  Yobe: ['Damaturu', 'Potiskum', 'Gashua (Bade)', 'Nguru', 'Geidam', 'Fika', 'Machina', 'Nangere'],
  Zamfara: ['Gusau', 'Kaura Namoda', 'Talata Mafara', 'Anka', 'Bungudu', 'Maradun', 'Zurmi', 'Tsafe'],
}

export const STATES = Object.keys(STATES_LGAS).sort()

export function getLGAs(state: string): string[] {
  return STATES_LGAS[state] ?? []
}

export const INTEREST_CATEGORIES = [
  'Phones & Accessories',
  'Electronics & Gadgets',
  'Fashion & Clothing',
  'Shoes & Bags',
  'Food & Groceries',
  'Health & Beauty',
  'Home & Furniture',
  'Kitchen & Appliances',
  'Automobiles & Parts',
  'Building Materials',
  'Agriculture & Livestock',
  'Books & Stationery',
  'Baby & Kids',
  'Sports & Fitness',
  'Services & Repairs',
  'Art & Crafts',
] as const

export type InterestCategory = (typeof INTEREST_CATEGORIES)[number]

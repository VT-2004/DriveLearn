// Official Maharashtra RTO Learner's License Practice Question Bank
// Sourced from Parivahan Sarathi (CMVR 1989 & Motor Vehicles Amendment Act 2019)
// Dual-Language Support: English & Marathi (मराठी)

export const RTO_QUIZ_QUESTIONS = [
  {
    id: 1,
    signType: 'mandatory',
    signSymbol: '🛑',
    questionEn: 'What does an octagonal red sign with STOP written on it indicate?',
    questionMr: 'अष्टकोनी लाल रंगाचा "STOP" चिन्ह काय दर्शवतो?',
    optionsEn: [
      'Slow down and proceed with caution',
      'Mandatory stop: Bring vehicle to complete halt before stop line',
      'Stop only if cross-traffic is arriving',
      'Parking prohibited zone'
    ],
    optionsMr: [
      'गती कमी करून सावधगिरीने पुढे जा',
      'अनिवार्य थांबा: स्टॉप लाईनच्या आधी वाहन पूर्णपणे थांबवा',
      'फक्त ट्रॅफिक असल्यास थांबा',
      'पार्किंग करण्यास मनाई क्षेत्र'
    ],
    correctAnswer: 1,
    explanationEn: 'Section 116 CMVR: Driver must bring the vehicle to a full stop before the stop line, yield to pedestrians, and proceed only when clear.',
    explanationMr: 'मोटार वाहन कायदा कलम ११६: चालकाने स्टॉप लाईनच्या मागे वाहन पूर्णपणे थांबवलेच पाहिजे आणि रस्ता मोकळा झाल्यावरच पुढे जावे.'
  },
  {
    id: 2,
    signType: 'cautionary',
    signSymbol: '⚠️ 🔄',
    questionEn: 'While driving uphill on a mountain road or ghat section (e.g. Khandala Ghat), which vehicle has the right of way?',
    questionMr: 'घाट रस्त्यावर किंवा चढणीवर गाडी चालवताना कोणत्या वाहनाला प्रथम जाण्याचा अधिकार (Right of Way) आहे?',
    optionsEn: [
      'The heavier vehicle descending downhill',
      'The vehicle traveling uphill has priority right of way',
      'The faster vehicle',
      'Whichever vehicle honks first'
    ],
    optionsMr: [
      'घाटातून खाली उतरणाऱ्या जड वाहनाला',
      'घाटावर वर चढणाऱ्या वाहनाला प्रथम जाण्याचा अधिकार आहे',
      'वेगाने जाणाऱ्या वाहनाला',
      'ज्याने प्रथम हॉर्न वाजवला त्याला'
    ],
    correctAnswer: 1,
    explanationEn: 'Rule 27 of Rules of the Road: Vehicles moving uphill have the right of way because restarting from a dead stop on a steep incline is difficult and dangerous.',
    explanationMr: 'नियम २७: चढणीवर जाणाऱ्या वाहनाला थांबावे लागल्यास पुन्हा सुरू करणे धोकादायक असल्याने त्यांना प्रथम जाण्याचा अधिकार असतो.'
  },
  {
    id: 3,
    signType: 'mandatory',
    signSymbol: '⛔',
    questionEn: 'What does a circular red sign with a horizontal white bar mean?',
    questionMr: 'पांढऱ्या आडव्या पट्ट्यासह वर्तुळाकार लाल चिन्ह काय दर्शवतो?',
    optionsEn: [
      'No Entry for all vehicles',
      'One Way traffic only',
      'Dead end ahead',
      'Restricted speed zone'
    ],
    optionsMr: [
      'सर्व प्रकारच्या वाहनांना प्रवेश बंदी (No Entry)',
      'फक्त एकाच बाजूने वाहतूक',
      'पुढे रस्ता बंद आहे',
      'मर्यादित वेग क्षेत्र'
    ],
    correctAnswer: 0,
    explanationEn: 'IRC 67 Standard: No Entry sign indicates that vehicular traffic is strictly forbidden from entering that street.',
    explanationMr: 'या रस्त्यावरून वाहनांना प्रवेश करण्यास पूर्णपणे मनाई आहे.'
  },
  {
    id: 4,
    signType: 'rules',
    signSymbol: '🚑',
    questionEn: 'What should a driver do when approached by an emergency vehicle (Ambulance or Fire Tender) with siren on?',
    questionMr: 'रुग्णवाहिका (Ambulance) किंवा अग्निशामक दलाचे वाहन सायरन वाजवत येत असल्यास चालकाने काय करावे?',
    optionsEn: [
      'Speed up to clear the way ahead',
      'Immediately move to the extreme left side of the road and allow free passage',
      'Maintain speed and ignore if in another lane',
      'Honk to alert other drivers'
    ],
    optionsMr: [
      'पुढे रस्ता मोकळा करण्यासाठी स्वतःचा वेग वाढवावा',
      'ताबडतोब रस्त्याच्या डाव्या बाजूला वाहन घेऊन त्यांना जाण्यासाठी मोकळा रस्ता द्यावा',
      'आपल्याच वेगाने चालत राहावे',
      'इतरांना सावध करण्यासाठी हॉर्न वाजवावा'
    ],
    correctAnswer: 1,
    explanationEn: 'Section 194E Motor Vehicles Act: Failing to draw to the side of the road for emergency vehicles attracts a fine of up to ₹10,000 or 6 months imprisonment.',
    explanationMr: 'कलम १९४ई: आपत्कालीन वाहनांना वाट न दिल्यास ₹१०,००० पर्यंत दंड किंवा ६ महिन्यांपर्यंत तुरुंगवास होऊ शकतो.'
  },
  {
    id: 5,
    signType: 'cautionary',
    signSymbol: '🚶‍♂️',
    questionEn: 'When approaching an uncontrolled Zebra pedestrian crossing where pedestrians are waiting to cross, you must:',
    questionMr: 'पादचारी रस्ता ओलांडण्याच्या ठिकाणी (Zebra Crossing) पादचारी उभे असल्यास तुम्ही काय करावे?',
    optionsEn: [
      'Honk continuously and pass quickly',
      'Slow down, stop before the white crossing line, and allow pedestrians to cross first',
      'Flash high beams and swerve around them',
      'Only stop if a traffic policeman is present'
    ],
    optionsMr: [
      'सतत हॉर्न वाजवून वेगाने निघून जावे',
      'वेग कमी करून झेब्रा क्रॉसिंगच्या आधी थांबावे व पादचाऱ्यांना प्रथम रस्ता ओलांडू द्यावा',
      'हेडलाईट फ्लॅश करून बाजूने निघून जावे',
      'फक्त ट्रॅफिक पोलीस असल्यास थांबावे'
    ],
    correctAnswer: 1,
    explanationEn: 'Pedestrians have absolute right of way at marked zebra crossings under Rule 11 of the Road Regulations.',
    explanationMr: 'झेब्रा क्रॉसिंगवर पादचाऱ्यांना रस्ता ओलांडण्याचा प्रथम अधिकार असतो.'
  },
  {
    id: 6,
    signType: 'mandatory',
    signSymbol: '5️⃣0️⃣',
    questionEn: 'What does a number inside a circular sign with a red border represent?',
    questionMr: 'लाल कडेच्या वर्तुळात संख्या (उदा. ५०) लिहिलेली असल्यास काय दर्शवते?',
    optionsEn: [
      'Recommended minimum speed limit',
      'Mandatory maximum speed limit in km/h',
      'Distance to nearest city in kilometers',
      'Highway route number'
    ],
    optionsMr: [
      'किमान वेग मर्यादा',
      'कमाल वेग मर्यादा (Maximum Speed Limit किमी/तास)',
      'पुढील शहराचे अंतर',
      'महामार्ग क्रमांक'
    ],
    correctAnswer: 1,
    explanationEn: 'Section 112: The speed indicated inside a red circle is the maximum permissible legal speed limit on that stretch of road.',
    explanationMr: 'लाल वर्तुळातील संख्या ही त्या रस्त्यावरील वाहनाची जास्तीत जास्त कायदेशीर वेग मर्यादा असते.'
  },
  {
    id: 7,
    signType: 'rules',
    signSymbol: '🔄',
    questionEn: 'Under normal driving conditions in India, on which side are you legally allowed to overtake another vehicle?',
    questionMr: 'भारतात सर्वसाधारणपणे पुढील वाहनाला कोणत्या बाजूने ओव्हरटेक (पुढे जाणे) कायदेशीर आहे?',
    optionsEn: [
      'From the left side only',
      'From the right side of the vehicle being overtaken',
      'Either side depending on road width',
      'From the footpath side'
    ],
    optionsMr: [
      'फक्त डाव्या बाजूने',
      'पुढील वाहनाच्या उजव्या बाजूने',
      'कोणत्याही बाजूने',
      'फुटपाथच्या बाजूने'
    ],
    correctAnswer: 1,
    explanationEn: 'Rule 13: The driver of a motor vehicle shall overtake any other vehicle only on its right side, except when the vehicle in front has signaled to turn right.',
    explanationMr: 'नियम १३: चालकाने नेहमी पुढील वाहनाच्या उजव्या बाजूनेच ओव्हरटेक केले पाहिजे.'
  },
  {
    id: 8,
    signType: 'mandatory',
    signSymbol: '🅿️❌',
    questionEn: 'A blue circular sign with a red border and a single diagonal red slash across the letter "P" means:',
    questionMr: 'निळ्या वर्तुळावर लाल बॉर्डर आणि "P" अक्षरावर एक तिरपी लाल रेषा काय दर्शवते?',
    optionsEn: [
      'Parking Permitted',
      'No Parking (Stopping allowed for boarding/alighting only)',
      'No Stopping or Standing',
      'Paid Parking Zone'
    ],
    optionsMr: [
      'पार्किंगला परवानगी आहे',
      'पार्किंग करण्यास मनाई (No Parking)',
      'वाहन थांबवण्यास पूर्ण मनाई (No Stopping)',
      'सशुल्क पार्किंग'
    ],
    correctAnswer: 1,
    explanationEn: 'Single slash through P indicates No Parking. Cross slash (X) indicates No Stopping / No Standing.',
    explanationMr: 'एक तिरपी रेषा म्हणजे पार्किंग बंदी. दोन तिरप्या रेषा (X) म्हणजे वाहन अजिबात न थांबवणे.'
  },
  {
    id: 9,
    signType: 'rules',
    signSymbol: '📄',
    questionEn: 'Under Central Motor Vehicle Rules, what is the validity period of a Learner’s License (LL Form 2)?',
    questionMr: 'मोटार वाहन कायद्यानुसार शिकाऊ परवान्याची (Learner’s License) मुदत किती असते?',
    optionsEn: [
      '30 days from date of issue',
      '6 months from date of issue',
      '1 year from date of issue',
      'Till candidate turns 21'
    ],
    optionsMr: [
      'काढल्यापासून ३० दिवस',
      'काढल्यापासून ६ महिने (6 Months)',
      'काढल्यापासून १ वर्ष',
      'उमेदवाराचे वय २१ होईपर्यंत'
    ],
    correctAnswer: 1,
    explanationEn: 'CMVR Rule 14: A Learner’s License is valid across India for a period of 6 months from the date of issuance.',
    explanationMr: 'नियम १४: शिकाऊ परवाना (LL) संपूर्ण भारतात जारी केल्याच्या तारखेपासून ६ महिन्यांसाठी वैध असतो.'
  },
  {
    id: 10,
    signType: 'rules',
    signSymbol: '⏳',
    questionEn: 'What is the minimum statutory waiting period after getting a Learner License before you can apply for a Permanent DL test?',
    questionMr: 'शिकाऊ परवाना मिळाल्यानंतर पक्क्या लायसन्सच्या (Permanent DL) चाचणीसाठी किमान किती दिवसांचा कालावधी पूर्ण होणे आवश्यक आहे?',
    optionsEn: [
      '7 days',
      '30 days mandatory minimum waiting period',
      '60 days',
      'No waiting period, immediate application allowed'
    ],
    optionsMr: [
      '७ दिवस',
      'किमान ३० दिवस पूर्ण होणे अनिवार्य आहे',
      '६० दिवस',
      'कोणतीही वाट न पाहता लगेच'
    ],
    correctAnswer: 1,
    explanationEn: 'CMVR Rule 15: A learner license holder can apply for the permanent driving license test only after a mandatory completion of 30 days of training.',
    explanationMr: 'नियम १५: शिकाऊ परवाना मिळाल्यापासून ३० दिवसांचे प्रशिक्षण पूर्ण झाल्यावरच पक्क्या लायसन्सच्या चाचणीस बसता येते.'
  },
  {
    id: 11,
    signType: 'cautionary',
    signSymbol: '🏫',
    questionEn: 'When driving past a sign displaying children with school bags, the driver should:',
    questionMr: 'शाळेचे चिन्ह (School Ahead) दिसल्यास चालकाने काय करावे?',
    optionsEn: [
      'Maintain speed of 60 km/h and honk loudly',
      'Reduce speed drastically and watch out for children crossing unexpectedly',
      'Speed up to avoid school crowd',
      'Ignore unless school bell is ringing'
    ],
    optionsMr: [
      '६० किमी वेगाने हॉर्न वाजवत जावे',
      'वेग खूप कमी करावा आणि मुले रस्ता ओलांडण्याची शक्यता असल्याने सावध राहावे',
      'गर्दी टाळण्यासाठी वेग वाढवावा',
      'शाळेची घंटा वाजत नसेल तर दुर्लक्ष करावे'
    ],
    correctAnswer: 1,
    explanationEn: 'Cautionary School Sign: Speed limit is restricted to 25 km/h near school zones across Maharashtra municipalities.',
    explanationMr: 'शाळा परिसरात वेग मर्यादा २५ किमी/तास असते व मुलांच्या सुरक्षेसाठी सावध चालवणे बंधनकारक आहे.'
  },
  {
    id: 12,
    signType: 'rules',
    signSymbol: '🍷❌',
    questionEn: 'What is the maximum permissible Blood Alcohol Content (BAC) for a driver under Section 185 in India?',
    questionMr: 'कलम १८५ नुसार भारतात वाहन चालवताना रक्तातील अल्कोहोलचे कमाल प्रमाण किती अनुज्ञेय आहे?',
    optionsEn: [
      'Zero tolerance / Not exceeding 30 mg per 100 ml of blood',
      '80 mg per 100 ml',
      '100 mg per 100 ml',
      'Any amount as long as driver feels fine'
    ],
    optionsMr: [
      '३० मिलीग्राम प्रति १०० मिली रक्तापेक्षा जास्त नसावे (Zero Tolerance)',
      '८० मिलीग्राम प्रति १०० मिली',
      '१०० मिलीग्राम प्रति १०० मिली',
      'चालकाला ठीक वाटत असल्यास कितीही'
    ],
    correctAnswer: 0,
    explanationEn: 'Section 185 MV Act: Alcohol level exceeding 30 mg per 100 ml of blood detected by a breath analyzer leads to immediate arrest, up to ₹10,000 fine, or imprisonment.',
    explanationMr: 'रक्तात ३० मिग्रॅ पेक्षा जास्त अल्कोहोल आढळल्यास १०,००० दंड किंवा ६ महिने कारावास होऊ शकतो.'
  },
  {
    id: 13,
    signType: 'mandatory',
    signSymbol: '🪖',
    questionEn: 'Under Maharashtra State Transport regulations, who is required to wear a BIS-certified helmet on a two-wheeler?',
    questionMr: 'महाराष्ट्र वाहतूक नियमांनुसार दुचाकीवर बीआयएस प्रमाणित (BIS) हेल्मेट घालणे कोणासाठी सक्तीचे आहे?',
    optionsEn: [
      'Only the main rider',
      'Both the rider and the pillion rider',
      'Only when riding on National Highways',
      'Only male riders'
    ],
    optionsMr: [
      'फक्त चालकासाठी',
      'चालक आणि मागे बसलेली व्यक्ती (Pillion Rider) दोघांसाठीही अनिवार्य',
      'फक्त हायवेवर',
      'फक्त पुरुषांसाठी'
    ],
    correctAnswer: 1,
    explanationEn: 'Section 129 MV Act: Every person driving or riding on a motorcycle of any class shall, while in a public place, wear protective headgear conforming to BIS standards.',
    explanationMr: 'कलम १२९: दुचाकी चालक आणि पाठीमागे बसलेली व्यक्ती दोघांनीही आयएसआय/बीआयएस हेल्मेट घालणे सक्तीचे आहे.'
  },
  {
    id: 14,
    signType: 'rules',
    signSymbol: '🅿️⛰️',
    questionEn: 'When parking a manual transmission car facing downhill on a steep slope, what gear should you leave the car in?',
    questionMr: 'उतारावर कार पार्क करताना हँडब्रेक सोबत कार कोणत्या गिअरमध्ये ठेवावी?',
    optionsEn: [
      'Neutral gear (N)',
      'Reverse gear (R) with wheels turned toward the curb',
      'Top 5th gear',
      'Leave in half-clutch'
    ],
    optionsMr: [
      'न्यूट्रल (Neutral) गिअरमध्ये',
      'रिव्हर्स (Reverse) गिअरमध्ये आणि चाके रस्त्याच्या कडेला वळवून',
      'पाचव्या गिअरमध्ये',
      'हाफ क्लचमध्ये'
    ],
    correctAnswer: 1,
    explanationEn: 'Standard Parking Protocol: When facing downhill, engage Reverse gear and turn front wheels towards the curb so the car cannot roll forward if the handbrake slips.',
    explanationMr: 'उतारावर तोंड असताना रिव्हर्स गिअर आणि चढणीवर तोंड असताना पहिला गिअर टाकावा, जेणेकरून हँडब्रेक निसटल्यास कार पुढे घसरणार नाही.'
  },
  {
    id: 15,
    signType: 'mandatory',
    signSymbol: '📯❌',
    questionEn: 'What does a horn symbol with a red cross slash indicate?',
    questionMr: 'हॉर्नच्या चिन्हावर लाल तिरपी रेषा असल्यास काय दर्शवते?',
    optionsEn: [
      'Honking is compulsory before turning',
      'Silence zone: Sounding of horn is strictly prohibited',
      'Use electric horn only',
      'Music prohibited zone'
    ],
    optionsMr: [
      'वळण्यापूर्वी हॉर्न वाजवणे अनिवार्य आहे',
      'शांतता क्षेत्र: हॉर्न वाजवण्यास सक्त मनाई (No Honking Zone)',
      'फक्त इलेक्ट्रॉनिक हॉर्न वापरावा',
      'गाणी वाजवण्यास मनाई'
    ],
    correctAnswer: 1,
    explanationEn: 'Silent Zone (Hospital, Court, School areas): Sounding horn attracts penalty under Section 194F of the Motor Vehicles Act.',
    explanationMr: 'हॉर्न वाजवण्यास बंदी असलेले क्षेत्र (उदा. रुग्णालय, न्यायालय परिसर).'
  }
];

// Student Learner License Record (Pooja Kulkarni) for the 30-Day Mandatory Waiting Clock
export const LEARNER_SARATHI_PROFILE = {
  learnerName: 'Pooja Kulkarni',
  llNumber: 'MH-12/LL/2026/088192',
  applicationNo: 'SARATHI-MH-9941029',
  rtoOffice: 'Pune RTO (Alandi Road, Maharashtra)',
  llIssueDate: '2026-08-05', // August 5, 2026
  currentDate: '2026-08-22', // Day 17 of training
  mandatoryWaitDays: 30,
  daysCompleted: 17,
  daysRemaining: 13,
  permanentDlEligibilityDate: '2026-09-04',
  form2Status: 'Digitally Verified on Sarathi',
  medicalFitnessForm1A: 'Self-Certified Valid',
};

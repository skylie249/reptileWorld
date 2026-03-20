const fs = require('fs');

const koAdd = {
    g_title: "파충류 입문 A to Z",
    g_desc: "전문가가 알려주는 기초 지식부터 세팅까지! FAQ 형태로 초보자분들이 가장 궁금해하는 내용들을 정리했습니다.",
    g_q1: "1. 처음 키워보는데, 어떤 파충류가 좋을까요?",
    g_a1_p: "파충류 입문자 분들께는 관리가 비교적 쉽고, 온도나 습도 조건이 너무 까다롭지 않은 종을 추천드립니다.",
    g_a1_l1: "<strong>크레스티드 게코:</strong> 곤충을 무서워하는 분들께 가장 추천합니다. '슈퍼푸드'라는 물에 개어 먹이는 전용 사료만으로 평생 사육이 가능하며 온순합니다.",
    g_a1_l2: "<strong>레오파드 게코:</strong> 귀여운 미소와 적당한 크기를 지녔습니다. 충식(귀뚜라미, 밀웜 등)을 필수적으로 급여해야 하지만 튼튼하고 사람 손을 잘 탑니다.",
    g_a1_l3: "<strong>콘 스네이크:</strong> 성격이 매우 온순하고 먹이 급여 주기가 주 1~2회로 여유로워 관리가 수월합니다.",
    
    g_q2: "2. 기본적으로 어떤 사육 장비가 필요한가요?",
    g_a2_p: "파충류가 건강하게 지내기 위해서는 종에 맞는 환경 조성이 필수입니다.",
    g_a2_l1: "<strong>사육장 사이즈:</strong> 개체가 다 자랐을 때 크기의 1.5배 이상 되는 케이지가 이상적입니다. (교목성인 크레스티드 게코는 높이가 높은 케이지, 지상성인 레오파드 게코는 넓은 케이지)",
    g_a2_l2: "<strong>열원 (난방장치):</strong> 변온동물인 파충류가 체온을 스스로 조절할 수 있도록 스팟 램프, 하부 히터(전기장판) 등을 준비해야 합니다.",
    g_a2_l3: "<strong>자외선 (UVB 램프):</strong> 종에 따라 체내에서 칼슘을 합성하기 위해 자외선 조명이 필수인 경우가 많습니다. (거북이, 주행성 도마뱀 등)",
    g_a2_l4: "<strong>기타 필수품:</strong> 온/습도계, 물그릇, 은신처(숨어있을 공간), 바닥재 등이 있습니다.",
    
    g_q3: "3. 온도와 습도는 어떻게 관리해야 하나요?",
    g_a3_p1: "대부분의 파충류는 추위에 매우 취약합니다.",
    g_a3_p2: "<strong>온도:</strong> 사육장 한쪽은 따뜻하게(Hot zone), 반대쪽은 비교적 시원하게(Cool zone) 설정하여 개체가 스스로 원하는 온도를 찾아가게 해주는 것이 좋습니다. 예를 들어 레오파드 게코는 핫존 30~32도, 쿨존은 24~26도 수준이 적절합니다.",
    g_a3_p3: "<strong>습도:</strong> 지나치게 건조하거나 습하면 피부병, 탈피 부전(허물을 제대로 못 벗는 현상)이 올 수 있습니다. 바닥재에 물을 분무해주거나 탈피 기간에는 '습식 은신처'를 별도로 두어 습기를 채워야 합니다.",
    
    g_q4: "4. 먹이와 영양제(비타민/칼슘) 급여 방법",
    g_a4_p1: "초식, 육식, 잡식 여부에 따라 먹이가 완전히 달라지므로 꼭 자신이 분양받을 종의 식성을 체크해야 합니다.",
    g_a4_p2: "또한 먹이에 영양제 가루를 묻혀서 주는 <strong>'더스팅(Dusting)'</strong> 과정이 반드시 필요합니다.",
    g_a4_l1: "파충류 뼈를 튼튼하게 하기 위한 <strong>칼슘제</strong>가 필수입니다.",
    g_a4_l2: "UVB 램프 조명을 쓰지 않는 야행성 개체에게는 비타민 <strong>D3가 포함된 칼슘제</strong>를 주어야 합니다.",
    g_a4_l3: "이 영양소가 부족해지면 뼈가 휘거나 부러지는 МBD(대사성 골질환)라는 무서운 병을 얻게 됩니다.",
    
    g_q5: "5. 핸들링이나 사육 비용 등 알아두어야 할 점",
    g_a5_p1: "<strong>핸들링 (개체를 만지는 행동):</strong> 강아지, 고양이와 다르게 사람의 손길을 온전히 즐기기보다는 참고 견디는 경우가 많습니다. 스트레스를 방지하기 위해 턱 밑부터 조심스럽게 받쳐 손 위로 스스로 올라오게 유도하시고 하루 5분~10분 내외로 짧게 하는 것을 권합니다.",
    g_a5_p2: "<strong>초기 비용과 유지비:</strong> 생물 입양 비용보다 사육장, 자동온도조절기, 열원 등 세팅 장비 비용이 훨씬 높게 책정(최소 10~30만원 이상)될 수 있습니다. 또한 전기세, 매달 먹이 구매비 등 고정 지출이 발생함을 알아두세요."
};

const enAdd = {
    g_title: "Reptile Basics A to Z",
    g_desc: "From basic knowledge to setup from experts! Organized in FAQ format for beginners.",
    g_q1: "1. It's my first time, which reptile is good?",
    g_a1_p: "For beginners, we recommend species that are relatively easy to manage without overly strict temperature or humidity conditions.",
    g_a1_l1: "<strong>Crested Gecko:</strong> Highly recommended if you fear insects. They can be fed primarily on a powdered 'Superfood' mixed with water and are very docile.",
    g_a1_l2: "<strong>Leopard Gecko:</strong> Known for their cute smile. You must feed them live insects (crickets, mealworms), but they are hardy and easy to handle.",
    g_a1_l3: "<strong>Corn Snake:</strong> Extremely docile and feeding only 1-2 times a week makes management very easy.",
    
    g_q2: "2. What basic equipment do I need?",
    g_a2_p: "Creating a species-appropriate environment is essential for their health.",
    g_a2_l1: "<strong>Enclosure Size:</strong> An enclosure at least 1.5 times the length of the adult size is ideal (tall for arboreal, wide for terrestrial).",
    g_a2_l2: "<strong>Heat Source:</strong> Spot lamps, heat mats, etc., are necessary since reptiles are cold-blooded and need to thermoregulate.",
    g_a2_l3: "<strong>UVB Light:</strong> Depending on the species, UVB lighting is required to synthesize calcium (e.g., turtles, diurnal lizards).",
    g_a2_l4: "<strong>Other Essentials:</strong> Thermometer/hygrometer, water dish, hide(s), and appropriate substrate.",
    
    g_q3: "3. How to manage temperature and humidity?",
    g_a3_p1: "Most reptiles are very vulnerable to the cold.",
    g_a3_p2: "<strong>Temperature:</strong> Create a temperature gradient with a Hot zone and a Cool zone so the animal can choose. E.g., Leopard Geckos need 30-32°C on the hot side and 24-26°C on the cool side.",
    g_a3_p3: "<strong>Humidity:</strong> Incorrect humidity can cause skin issues and shedding problems. Mist the enclosure or provide a 'moist hide' during shedding times.",
    
    g_q4: "4. How to provide food and supplements (Vitamins/Calcium)?",
    g_a4_p1: "Diet varies greatly between herbivores, carnivores, and omnivores. Always check your species' specific diet.",
    g_a4_p2: "You must also <strong>'dust'</strong> the food with supplement powders.",
    g_a4_l1: "<strong>Calcium powder</strong> is essential for strong bones.",
    g_a4_l2: "Nocturnal species that don't need UVB require <strong>calcium with added Vitamin D3</strong>.",
    g_a4_l3: "A lack of these nutrients leads to Metabolic Bone Disease (MBD), a severe condition that deforms bones.",
    
    g_q5: "5. Handling and living costs to be aware of",
    g_a5_p1: "<strong>Handling:</strong> Unlike dogs and cats, reptiles usually tolerate rather than enjoy handling. Avoid stress by supporting them from underneath and encouraging them to walk onto your hand. Keep sessions short (5-10 mins).",
    g_a5_p2: "<strong>Initial & Ongoing Costs:</strong> Setup costs (enclosure, thermostat, heating) can often exceed the cost of the animal (at least $100-300+). Remember to budget for ongoing electricity and monthly food expenses."
};

const jaAdd = {
    g_title: "爬虫類入門 A to Z",
    g_desc: "専門家がお教えする基礎知識からセッティングまで！初心者が最も気になる内容をFAQ形式でまとめました。",
    g_q1: "1. 初めてですが、どんな爬虫類が良いですか？",
    g_a1_p: "入門者の方には、管理が比較的容易で、温湿度条件が厳しすぎない種をお勧めします。",
    g_a1_l1: "<strong>クレステッドゲッコー:</strong> 虫が苦手な方に最適です。水で溶かす専用フード「スーパーフード」だけで飼育でき、温和です。",
    g_a1_l2: "<strong>ヒョウモントカゲモドキ:</strong> かわいい笑顔とお手頃なサイズ。昆虫食（コオロギやミルワーム等）が必須ですが、丈夫でハンドリングしやすいです。",
    g_a1_l3: "<strong>コーンスネーク:</strong> 非常に温和で、餌やりも週に1〜2回程度で管理が楽です。",
    
    g_q2: "2. 基本的にどんな飼育設備が必要ですか？",
    g_a2_p: "種に合わせた環境作りが必須です。",
    g_a2_l1: "<strong>ケージのサイズ:</strong> 成体の大きさの1.5倍以上のケージが理想です（樹上性は高さ、地上性は広さが必要です）。",
    g_a2_l2: "<strong>熱源（保温器具）:</strong> 変温動物である爬虫類が体温を調節できるよう、スポットランプやパネルヒーターなどを準備します。",
    g_a2_l3: "<strong>紫外線（UVBランプ）:</strong> 種によってはカルシウム合成のために必須です（カメや昼行性トカゲなど）。",
    g_a2_l4: "<strong>その他の必需品:</strong> 温湿度計、水入れ、シェルター（隠れ家）、床材などが必要です。",
    
    g_q3: "3. 温度と湿度はどのように管理すべきですか？",
    g_a3_p1: "ほとんどの爬虫類は寒さに非常に弱いです。",
    g_a3_p2: "<strong>温度:</strong> ケージの片方を暖かく（ホットスポット）、反対側を比較的涼しく（クールスポット）設定し、自分で好きな温度の場所を選べるようにします。",
    g_a3_p3: "<strong>湿度:</strong> 乾燥しすぎや湿潤しすぎは皮膚病や脱皮不全の原因になります。霧吹きをするか、脱皮期間中は「湿度シェルター」を設けて水分を補いましょう。",
    
    g_q4: "4. 餌とサプリメント（ビタミン/カルシウム）の与え方",
    g_a4_p1: "草食、肉食、雑食による違いが大きいため、飼育する種の食性を必ず確認してください。",
    g_a4_p2: "また、餌にサプリメントの粉をまぶして与える<strong>「ダスティング(Dusting)」</strong>が必須です。",
    g_a4_l1: "骨を丈夫にするための<strong>カルシウム剤</strong>が必須です。",
    g_a4_l2: "UVBランプを使用しない夜行性の個体には、<strong>ビタミンD3入りカルシウム剤</strong>を与える必要があります。",
    g_a4_l3: "これらの栄養素が不足すると、骨が曲がったり折れたりするクル病（MBD）という恐ろしい病気になります。",
    
    g_q5: "5. ハンドリングや飼育費用などの注意点",
    g_a5_p1: "<strong>ハンドリング:</strong> 犬や猫とは異なり、人の手を喜ぶというよりは「我慢している」ことが多いです。下から優しく掬い上げるようにし、1回5〜10分程度にとどめましょう。",
    g_a5_p2: "<strong>初期費用と維持費:</strong> 生体の価格よりも、ケージやサーモスタットなどの設備費用の方が高くつく場合が多いです。また、電気代や毎月の餌代などの固定出費が発生します。"
};

let content = fs.readFileSync('d:\\99.ETC\\old_projects\\antigravityProjects\\webSites\\reptile_world\\js\\i18n.js', 'utf8');

function injectTranslations(lang, additions) {
    let addStr = '';
    for (const [key, val] of Object.entries(additions)) {
        addStr += `        ${key}: \`${val}\`,\n`;
    }
    // Find where the `foot_desc` property is and insert right before it or just find `img_select: "..."` line
    const regex = new RegExp(`(${lang}:\\s*{[\\s\\S]*?)(img_select:[^\\n]+)(\\n\\s*})`);
    content = content.replace(regex, `$1$2,\n${addStr}$3`);
}

injectTranslations('ko', koAdd);
injectTranslations('en', enAdd);
injectTranslations('ja', jaAdd);

fs.writeFileSync('d:\\99.ETC\\old_projects\\antigravityProjects\\webSites\\reptile_world\\js\\i18n.js', content);
console.log('Successfully updated i18n.js with guide texts.');

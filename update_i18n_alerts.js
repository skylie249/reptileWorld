const fs = require('fs');
const filepath = 'js/i18n.js';
let content = fs.readFileSync(filepath, 'utf8');

const newKo = `
    mypage_alert_empty: "내용을 작성하거나 파충류 사진을 등록해 주세요.",
    mypage_alert_full: "로컬 저장소 용량이 초과되었습니다. 너무 많은 고화질 사진을 올리셨을 수 있습니다. 기존 데이터를 일부 삭제해 주세요.",
    mypage_alert_delete: "이 다이어리 기록을 정말 삭제하시겠습니까?",
    mypage_dummy_img: "샘플 이미지 공간",
    mypage_dummy_date: "샘플 기록 날짜",
    mypage_dummy_desc: "이 공간은 샘플 데모 데이터입니다. 새로운 다이어리 글과 사진을 작성하면 이곳에 등록됩니다!",
    detail_alert_select: "게시글 리스트에서 조회할 다이어리를 먼저 선택해 주세요.",
    detail_deleted: "삭제되었거나 존재하지 않는 게시물입니다.",
    detail_title: "파충류 다이어리",
    mypage_del_title: "글 삭제",
`;

const newEn = `
    mypage_alert_empty: "Please write content or upload a reptile photo.",
    mypage_alert_full: "Local storage capacity exceeded. Please delete some existing data.",
    mypage_alert_delete: "Are you sure you want to delete this diary record?",
    mypage_dummy_img: "Sample Image Area",
    mypage_dummy_date: "Sample Record Date",
    mypage_dummy_desc: "This is sample demo data. Write a new diary entry and photo, and it will be registered here!",
    detail_alert_select: "Please select a diary from the list first.",
    detail_deleted: "This post has been deleted or does not exist.",
    detail_title: "Reptile Diary",
    mypage_del_title: "Delete Post",
`;

const newJa = `
    mypage_alert_empty: "内容を入力するか、爬虫類の写真を登録してください。",
    mypage_alert_full: "ローカルストレージの容量を超過しました。既存のデータを一部削除してください。",
    mypage_alert_delete: "この日記記録を本当に削除しますか？",
    mypage_dummy_img: "サンプル画像スペース",
    mypage_dummy_date: "サンプル記録日",
    mypage_dummy_desc: "これはサンプルデモデータです。新しい日記と写真を作成するとここに登録されます！",
    detail_alert_select: "まずリストから照会する日記を選択してください。",
    detail_deleted: "削除されたか、存在しない投稿です。",
    detail_title: "爬虫類日記",
    mypage_del_title: "投稿削除",
`;

content = content.replace("ko: {", "ko: {" + newKo);
content = content.replace("en: {", "en: {" + newEn);
content = content.replace("ja: {", "ja: {" + newJa);

fs.writeFileSync(filepath, content);
console.log('i18n.js updated with alerts/dynamic texts');

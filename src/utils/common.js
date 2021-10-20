export const READONLY_NOTI = {
  text:"읽기전용 사용자입니다.",
  type:"danger"
}

export function stripTags(htmlStr){
  const dom = new DOMParser().parseFromString(htmlStr, 'text/html');
  const txt = dom.body.textContent;
  return txt
}

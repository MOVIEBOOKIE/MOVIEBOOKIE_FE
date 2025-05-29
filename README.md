# MOVIEBOOKIE_FE
🍿 영화관을 더 쉽고 더 자유롭게, 무비부키

## **⭐️ 팀 소개**

<aside>

### 🍀 무**키부키**

     기획도 럭키하게, 디자인도 럭키하게, 개발도 럭키하게.. 항상 행복한 행운들이 떨어질 럭키부키 팀입니다 😊

</aside>
## **🌟 R&R 분배**

| **분야** | **이름** | **포지션** |
| --- | --- | --- |
| 기획 | 이소희 | 📈 PM, 서비스 기획 - 유저리서치, 기획 문서 정리 |
| 기획 | 유규빈 | 📊서비스 기획 - 유저리서치, 기획 문서 정리 |
| 디자인 | 김서현 | 🔐 디자인 리드,  프로덕트 매니징, UXUI디자인 |
| 디자인 | 김수연 | 📢 서비스 디자인, UXUI 디자인, GUI디자인 |
| 프론트엔드 | 안혜련 | 🔦 프론트엔드 리드, 화면 UI 구현, 서버 연동 |
| 프론트엔드 | 박소현 | 📱 화면 UI 구현, 서버 연동 |
| 백엔드 | 문정욱 | 💻 백엔드 리드, DB 및 API 구축, 서버 배포 |
| 백엔드 | 김광현 | 🖥️ DB 및 API 구축 |




## 무비부키(Moviebookie)

### 모집부터 상영까지, 영화관 대관 도움 서비스

---

🍿 ***영화관에서 영화를 ‘예매’하듯, 당신의 추억을 ‘예약’하며**  
영화 관람 그 이상으로, 일상을 특별한 순간으로 만들게 해줍니다.*

![Mssion, Slogan, VIsion](https://github.com/user-attachments/assets/f35bdf11-bcc1-4f48-8796-941b359eedf9)
### 슬로건 (Slogon)

<aside>

> **It’s your own Theatre, Screen your moment.**
> 

누구나 쉽게, 나만의 영화관을 만들다. 오늘, 영화관에서 당신만의 추억을 예약해보세요! 

</aside>

<aside>

### 미션 (Mission)

</aside>

<aside>

> Make it real, Meet with ease, Moments forever
> 

사용자가 자유롭게 이벤트를 주최하고 함께할 사람들과 자연스럽게 연결되도록 돕습니다.

</aside>

<aside>

### 비전 (Vision)

</aside>

<aside>

> Where Every gets the Spotlight
> 

누구나 손쉽게 자신만의 순간을 스크린에 담을 수 있는 세상, 그 중심에 무비부키가 있습니다. 

</aside>

</aside>


## 💬 배경 Background 

![Slide 16_9 - 1062](https://github.com/user-attachments/assets/4cc68116-88a5-4261-a079-c9de7a9c5c4b)
>  최근 영화진흥위원회가 공개한 “2024년 한국 영화산업 결산’에 따르면, 2019년 약 1조 9천억 원에 달했던 극장 매출은 코로나19 이후 급감했고, 2024년에도 약 1조 1천억 원 수준에 머무르며 약 38% 감소한 것으로 나타나, 완전한 회복까지는 여전히 어려운 상황이다.

### 🎥 영화관의 활용 변화

**복합문화공간으로 바뀌는 영화관의 용도**

<aside>

영화관은 단순히 영화를 관람하는 공간을 넘어, **다양한 방식으로 공간을 활용**하려는 시도가 늘어나고 있다.

- **CGV**는 공연 실황 중계, 클래식 콘서트, 팬미팅 등 확장형 콘텐츠 상영을 확대
- **롯데시네마**는 관객 참여형 프로그램인 무비플러팅(단체 소개팅)’을 통해 이색 경험을 제공
- **메가박스**는 전석 리클라이너관을 신설하고, ‘메가쉼표’ 낮잠 이벤트 등 프리미엄 휴식 콘텐츠 제공

<aside>

### 👥 **행동하는 팬덤이 만든 단체관람 문화**

</aside>

**행동하는 팬덤이 만든 단체관람 문화**

<aside>

‘환승연애2’ 단관, 월드컵 경기 단관 등 대중적인 콘텐츠부터 애니메이션이나 아이돌 콘텐츠 중심의 팬덤 상영회까지, **다양한 단체관람 이벤트가 팬덤에 의해 자발적으로 기획**되고 있다.  이들은 상영회를 직접 기획하고, 콘텐츠를 확산시키는 ‘주최자이자 기획자’로서 적극적으로 움직이고 있다. 

</aside>
## 우리는 영화관 활용 용도와 문화의 변화 속에서 새로운 수요와 가능성을 발견했습니다.

## 🧑🏻‍💻 백엔드

### ERD
<img width="800" alt="무비부키 ERD" src="https://github.com/user-attachments/assets/75c7d96b-4853-4284-9c5c-d77272540763" />

### System Architecture
<img width="700" alt="무비부키 아키텍쳐" src="https://github.com/user-attachments/assets/3e2c150a-8a57-499c-a197-1347baf21147" />

### API Docs
**노션 링크**: https://waiting-candle-f33.notion.site/API-1cc3e5c872e78094864ccd251d8ea004?pvs=4

### Project Structure
```markdown
src
├── main
│   ├── domain
│   |    ├── category
│   |    ├── certification
│   |    ├── event
│   |    ├── feedback
│   |    ├── location
│   |    ├── notification
│   |    ├── participation
│   |    ├── user
│   |    |    ├── controller
│   |    |    ├── converter
│   |    |    ├── dto
│   |    |    |     ├── request
│   |    |    |     └── response
│   |    |    ├── entity
│   |    |    ├── repository
│   |    |    ├── service
│   |    |    └── util
│   |    └── ticket
│   |    
│   └── global
│        ├── apiPayload
│        ├── config
│        ├── entity
│        ├── handler
│        ├── jwt
│        ├── oauth
│        ├── redis
│        ├── service
│        └── util
│       
└── resources
    ├── application-dev.yml
    └── application-prod.yml
```
### Tech Stack
- `Jdk 21`
- `Spring Boot 3.2.5`
- `MySQL 9.3.0`, `Redis 5.0.7`
- `NCP Server`, `NCP Object Storage`, `Docker`, `Github Action`
- `JPA`, `Swagger`, `Spring Security`, `JWT`, `FCM`



### Commit Convention
| 커밋 타입 | 설명 | 예시 |
| ------- | ---- | ---- |
| ✨ **Feat** | 새로운 기능 추가 | `[FEAT] #이슈번호: 기능 추가` |
| 🐛 **Fix** | 버그 수정 | `[FIX] #이슈번호: 오류 수정` |
| 📄 **Docs** | 문서 수정 | `[DOCS] #이슈번호: README 파일 수정` |
| ♻️ **Refactor** | 코드 리팩토링 | `[REFACTOR] #이슈번호: 함수 구조 개선` |
| 📦 **Chore** | 빌드 업무 수정, 패키지 매니저 수정 등 production code와 무관한 변경 | `[CHORE] #이슈번호: .gitignore 파일 수정` |
| 💬 **Comment** | 주석 추가 및 변경 | `[COMMENT] #이슈번호: 함수 설명 주석 추가` |
| 🔥 **Remove** | 파일 또는 폴더 삭제 | `[REMOVE] #이슈번호: 불필요한 파일 삭제` |
| 🚚 **Rename** | 파일 또는 폴더명 수정 | `[RENAME] #이슈번호: 폴더명 변경` |


### Issue Template
```markdown
## Description
설명 작성

## To - Do
1.
2.
3.

## ETC
```

### PR Template
```markdown
## Issue

- 이슈 번호 및 링크


## Summary

- 요약 

## Describe your code

- 코드 설명 (설명이 필요한 코드가 있다고 생각하시면 간단하게 작성해주세요.)

# Check
- [ ] Reviewers 등록을 하였나요?
- [ ] Assignees 등록을 하였나요?
- [ ] 라벨 등록을 하였나요?
- [ ] PR 머지하기 전 반드시 CI가 정상적으로 작동하는지 확인해주세요!
```






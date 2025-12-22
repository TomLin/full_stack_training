# Builder 101 事件風暴分析 (Event Storming Analysis)

> **文件版本：** v1.0  
> **分析方法：** Event Storming  
> **圖例說明：**
>
> -   🟠 **Event** (事件) - 過去式，已發生的事實
> -   🔵 **Command** (命令) - 使用者或系統觸發的意圖
> -   🟡 **Aggregate** (聚合根) - 處理命令的實體
> -   👤 **Actor** (角色) - 觸發命令的人
> -   🟢 **Read Model** (讀取模型) - UI 所需的資料投影
> -   🟣 **Policy** (策略) - 事件驅動的反應式邏輯
> -   📋 **Rule** (規則) - 必須滿足的業務規則/不變量
> -   🖥️ **UI** (介面) - 使用者介面元素

---

## Epic 總覽

| Epic ID | Epic 名稱    | 說明                         |
| ------- | ------------ | ---------------------------- |
| E1      | 會員驗證系統 | 註冊、登入、驗證、Onboarding |
| E2      | 職缺探索系統 | 搜尋、篩選、列表、地圖模式   |
| E3      | 職缺詳情系統 | 詳情頁、結構化資訊、問答     |
| E4      | 應徵媒合系統 | 收藏、應徵、狀態追蹤         |
| E5      | 評論互動系統 | 評價、標籤、巢狀回覆         |
| E6      | 會員中心系統 | 儀表板、設定、驗證等級       |
| E7      | 通知系統     | 系統通知、互動通知           |

---

## E1: 會員驗證系統 (Authentication System)

### Story 1.1: 訪客註冊帳號

**User Story:**

> 作為一個訪客，我希望能夠註冊帳號，以便使用完整的平台功能（收藏、應徵）。

**Event Storming 流程：**

```
👤 Actor: 訪客 (Guest)

🖥️ UI: 註冊表單
   ├── Email 輸入框
   ├── 密碼輸入框
   ├── 確認密碼輸入框
   └── 服務條款勾選框

🔵 Command: 提交註冊 (SubmitRegistration)
   └── Payload: { email, password, agreedToTerms }

📋 Rule:
   ├── R1.1.1: Email 格式必須正確
   ├── R1.1.2: 密碼長度至少 8 字元
   ├── R1.1.3: 確認密碼必須與密碼一致
   ├── R1.1.4: Email 不可重複註冊
   └── R1.1.5: 必須同意服務條款

🟡 Aggregate: User
   └── Method: register(email, password)

🟠 Event: 帳號已建立 (AccountCreated)
   └── Payload: { userId, email, createdAt, verificationLevel: L0 }

🟣 Policy: 當帳號建立後，強制啟動 Onboarding
   └── Trigger: → 導向 Onboarding Wizard (Story 1.4)

🟢 Read Model: CurrentUser
   └── { userId, email, isLoggedIn: true, verificationLevel: L0 }
```

---

### Story 1.2: 會員登入系統

**User Story:**

> 作為一個已註冊會員，我希望能夠登入系統，以便存取我的個人資料與應徵紀錄。

**Event Storming 流程：**

```
👤 Actor: 已註冊會員 (RegisteredMember)

🖥️ UI: 登入表單
   ├── Email 輸入框
   ├── 密碼輸入框
   └── 忘記密碼連結

🔵 Command: 提交登入 (SubmitLogin)
   └── Payload: { email, password }

📋 Rule:
   ├── R1.2.1: Email 必須存在於系統中
   └── R1.2.2: 密碼必須正確

🟡 Aggregate: User
   └── Method: authenticate(email, password)

🟠 Event: 登入成功 (LoginSucceeded)
   └── Payload: { userId, email, loginAt }

🟣 Policy: 當登入成功後，檢查是否完成 Onboarding
   ├── IF onboardingCompleted = false → 導向 Onboarding Wizard
   └── IF 有 returnUrl → 導回原頁面

🟢 Read Model: CurrentUser
   └── { userId, email, isLoggedIn: true, preferences, verificationLevel }
```

---

### Story 1.3: 會員登出系統

**User Story:**

> 作為一個已登入會員，我希望能夠登出系統，以確保帳號安全。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: Header Dropdown
   └── 登出按鈕

🔵 Command: 執行登出 (Logout)

🟡 Aggregate: Session
   └── Method: invalidate()

🟠 Event: 已登出 (LoggedOut)
   └── Payload: { userId, logoutAt }

🟣 Policy: 當登出後，清除本地狀態
   ├── 清除 localStorage 中的 session
   └── 導向首頁

🟢 Read Model: CurrentUser
   └── { isLoggedIn: false }
```

---

### Story 1.4: 完成新手引導 (Onboarding)

**User Story:**

> 作為一個新註冊會員，我必須完成偏好設定，以便系統能夠提供個人化推薦。

**Event Storming 流程：**

```
👤 Actor: 新會員 (NewMember)

🖥️ UI: Onboarding Wizard
   ├── Step 1: 暱稱與大頭貼設定
   ├── Step 2: 興趣標籤雲 (工作類型多選)
   │   └── Options: [房務, 農務, 衝浪, 咖啡, 攝影, ...]
   └── Step 3: 住宿偏好 (單選)
       └── Options: [隱私優先, 熱鬧優先, 我都可以]

🔵 Command: 提交偏好設定 (SubmitPreferences)
   └── Payload: { nickname, avatar, workTypes[], accommodationPreference }

📋 Rule:
   ├── R1.4.1: 必須選擇至少一個工作類型
   ├── R1.4.2: 必須選擇住宿偏好
   └── R1.4.3: Onboarding 為強制流程，不可跳過

🟡 Aggregate: UserProfile
   └── Method: setPreferences(workTypes, accommodation)

🟠 Event: 偏好設定已完成 (PreferencesSet)
   └── Payload: { userId, workTypes, accommodationPreference, completedAt }

🟣 Policy: 當偏好設定完成後
   ├── 標記 onboardingCompleted = true
   ├── 觸發首頁推薦演算更新
   └── 導向首頁

🟢 Read Model: UserPreferences
   └── { workTypes[], accommodationPreference, onboardingCompleted: true }
```

---

### Story 1.5: 提升驗證等級

**User Story:**

> 作為一個會員，我希望能夠完成手機或身分驗證，以提升我的可信度並獲得更多權限。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: 驗證中心頁面
   ├── Email 驗證狀態
   ├── 手機驗證輸入
   └── 身分證上傳區

🔵 Command: 提交手機驗證 (VerifyPhone)
   └── Payload: { phoneNumber, verificationCode }

🔵 Command: 提交身分驗證 (VerifyIdentity)
   └── Payload: { idCardImage }

📋 Rule:
   ├── R1.5.1: 手機號碼格式必須正確
   ├── R1.5.2: 驗證碼必須在 5 分鐘內輸入
   └── R1.5.3: 身分證圖片必須清晰可辨

🟡 Aggregate: UserVerification
   └── Method: upgradeLevel(verificationType)

🟠 Event: 驗證等級已提升 (VerificationLevelUpgraded)
   └── Payload: { userId, newLevel, upgradedAt }

🟣 Policy: 當驗證等級提升後
   ├── 更新使用者標章顯示
   └── 發送通知「恭喜您已完成驗證」

🟢 Read Model: UserVerification
   └── { verificationLevel: L1|L2, badges[] }
```

---

## E2: 職缺探索系統 (Job Discovery System)

### Story 2.1: 瀏覽首頁推薦職缺

**User Story:**

> 作為一個使用者，我希望在首頁看到推薦的職缺，以便快速發現感興趣的機會。

**Event Storming 流程：**

```
👤 Actor: 訪客 | 會員

🖥️ UI: 首頁
   ├── Hero Section (搜尋入口)
   ├── 個人化推薦區 (已登入) | 熱門職缺區 (未登入)
   ├── 最近瀏覽區 (已登入)
   └── 信任見證輪播

🔵 Command: 載入首頁 (LoadHomepage)

📋 Rule:
   ├── R2.1.1: 未登入顯示「熱門職缺」(依 viewCount 排序)
   └── R2.1.2: 已登入顯示「推薦職缺」(依偏好演算)

🟡 Aggregate: JobCatalog
   └── Method: getRecommendations(userId?) | getPopular()

🟠 Event: 首頁已載入 (HomepageLoaded)

🟣 Policy: 載入時檢查登入狀態決定推薦邏輯

🟢 Read Model: HomepageContent
   ├── featuredJobs[] (依演算法)
   ├── recentlyViewed[] (從 localStorage)
   └── testimonials[]
```

---

### Story 2.2: 使用智慧搜尋

**User Story:**

> 作為一個使用者，我希望能夠透過搜尋框快速找到特定地點或類型的職缺。

**Event Storming 流程：**

```
👤 Actor: 訪客 | 會員

🖥️ UI: Omnibox 搜尋框
   ├── 地點輸入 (支援 Mega Menu)
   ├── 日期區間選擇
   └── 搜尋按鈕

🖥️ UI: Mega Menu (展開狀態)
   ├── 左側: 大區域 (北/中/南/東/離島)
   └── 右側: 細部城市

🔵 Command: 執行搜尋 (ExecuteSearch)
   └── Payload: { keyword?, location?, dateRange? }

🔵 Command: 輸入搜尋 (TypeSearch)
   └── Payload: { partialKeyword }

📋 Rule:
   └── R2.2.1: 搜尋結果依相關度與熱門度混合排序

🟡 Aggregate: SearchEngine
   └── Method: search(criteria)

🟠 Event: 搜尋已執行 (SearchExecuted)
   └── Payload: { criteria, resultCount }

🟣 Policy: 當輸入時顯示智慧建議
   ├── 顯示最近搜尋 (Recent)
   ├── 顯示熱門關鍵字 (Trending)
   └── 顯示模糊匹配建議 (Suggestions)

🟢 Read Model: SearchSuggestions
   └── { recent[], trending[], suggestions[] }

🟢 Read Model: SearchResults
   └── { jobs[], totalCount, appliedFilters }
```

---

### Story 2.3: 使用篩選器過濾職缺

**User Story:**

> 作為一個使用者，我希望能夠透過篩選條件縮小職缺範圍，以便更精準地找到符合需求的機會。

**Event Storming 流程：**

```
👤 Actor: 訪客 | 會員

🖥️ UI: Sticky Filter Bar (頂部)
   ├── 類型標籤 Pills: [房務, 衝浪, 農務, ...]
   └── 特性快篩: [🔥急徵, ❄️有冷氣, 💰有零用金]

🖥️ UI: Sidebar Filter (側邊欄)
   ├── 工時範圍 (Slider)
   ├── 房型 (Checkbox)
   ├── 性別限制 (Checkbox)
   └── 其他條件

🔵 Command: 套用篩選 (ApplyFilter)
   └── Payload: { types[], features[], workHours?, roomType?, ... }

🔵 Command: 清除篩選 (ClearFilters)

📋 Rule:
   ├── R2.3.1: 篩選器之間為 AND 關係
   ├── R2.3.2: 同一篩選器內的選項為 OR 關係
   └── R2.3.3: 無結果時顯示放寬建議

🟡 Aggregate: JobCatalog
   └── Method: filter(criteria)

🟠 Event: 篩選已套用 (FilterApplied)
   └── Payload: { filters, resultCount }

🟣 Policy: 當篩選結果為 0 時
   └── 顯示 Empty State + 推薦「放寬條件」或「鄰近地區」

🟢 Read Model: FilteredJobs
   └── { jobs[], appliedFilters, totalCount }
```

---

### Story 2.4: 切換地圖模式

**User Story:**

> 作為一個使用者，我希望能夠在地圖上瀏覽職缺位置，以便直觀地了解地理分佈。

**Event Storming 流程：**

```
👤 Actor: 訪客 | 會員

🖥️ UI: 視圖切換開關
   └── [列表模式] | [地圖模式]

🖥️ UI: 地圖模式畫面
   ├── 左側 (40%): 職缺卡片列表
   └── 右側 (60%): 滿版地圖 + Pin 標記

🔵 Command: 切換視圖 (ToggleViewMode)
   └── Payload: { mode: 'list' | 'map' }

🔵 Command: 點擊地圖標記 (ClickMapPin)
   └── Payload: { jobId }

📋 Rule:
   └── R2.4.1: 地圖 Pin 點擊後顯示職缺小卡片

🟡 Aggregate: MapView
   └── Method: setMode(mode)

🟠 Event: 視圖已切換 (ViewModeChanged)
   └── Payload: { mode }

🟣 Policy: 切換至地圖模式時
   └── 載入地圖 API 並渲染 Pin 點

🟢 Read Model: MapData
   └── { pins[]: { jobId, lat, lng, title, price } }
```

---

### Story 2.5: 瀏覽職缺泳道式陳列

**User Story:**

> 作為一個探索型使用者，我希望能夠依照不同主題（地區、類型、熱門、最新）瀏覽職缺。

**Event Storming 流程：**

```
👤 Actor: 訪客 | 會員

🖥️ UI: 探索頁面 (泳道式佈局)
   ├── 按工作類型: Icon 快選
   ├── 按精選內容: 編輯推薦輪播
   ├── 按熱門程度: 橫向卡片列表
   ├── 按地區: 圖像方塊
   └── 按最新上架: 垂直列表

🔵 Command: 載入探索頁 (LoadDiscoveryPage)

🔵 Command: 查看全部 (ViewAllInCategory)
   └── Payload: { category, sortBy }

📋 Rule:
   ├── R2.5.1: 熱門依 viewCount 排序
   ├── R2.5.2: 最新依 postedDate 排序
   └── R2.5.3: 每個泳道最多顯示 8 筆

🟡 Aggregate: JobCatalog
   └── Method: getByCategory(category, limit)

🟠 Event: 探索頁已載入 (DiscoveryPageLoaded)

🟢 Read Model: DiscoverySwimlanes
   ├── byCategory: { [type]: jobs[] }
   ├── featured: jobs[]
   ├── popular: jobs[]
   ├── byLocation: { [region]: { count, image } }
   └── newest: jobs[]
```

---

## E3: 職缺詳情系統 (Job Details System)

### Story 3.1: 查看職缺詳情

**User Story:**

> 作為一個使用者，我希望能夠查看職缺的完整資訊，以便評估是否適合我。

**Event Storming 流程：**

```
👤 Actor: 訪客 | 會員

🖥️ UI: 職缺詳情頁
   ├── 麵包屑導航
   ├── Hero Info (標題, 業主, 地點, 評分)
   ├── 結構化規格區
   │   ├── 工作條件: 工時、排班、強度
   │   ├── 食宿條件: 房型、供餐、冷氣
   │   └── 生活公約: 門禁、訪客、寵物
   ├── 問答區
   ├── 評論區
   └── Sticky Action Bar

🔵 Command: 載入職缺詳情 (LoadJobDetail)
   └── Payload: { jobId }

📋 Rule:
   └── R3.1.1: 瀏覽數 +1 (重複瀏覽 24 小時內不重複計算)

🟡 Aggregate: Job
   └── Method: getDetail(jobId)

🟠 Event: 職缺已被瀏覽 (JobViewed)
   └── Payload: { jobId, userId?, viewedAt }

🟣 Policy: 當職缺被瀏覽時
   ├── 更新瀏覽數 (viewCount++)
   └── 若已登入，加入「最近瀏覽」列表

🟢 Read Model: JobDetail
   └── { job, conditions, living, houseRules, reviews[], qna[] }
```

---

### Story 3.2: 在職缺頁提問

**User Story:**

> 作為一個會員，我希望能夠在職缺頁面提問，以解決我對該職缺的疑慮。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: 問答區
   ├── 提問輸入框
   └── 問答列表 (Question + Host Reply)

🔵 Command: 提交問題 (SubmitQuestion)
   └── Payload: { jobId, question }

📋 Rule:
   ├── R3.2.1: 必須登入才能提問
   ├── R3.2.2: 問題不得少於 10 字
   └── R3.2.3: 同一用戶對同職缺 24 小時內最多 3 則提問

🟡 Aggregate: JobQnA
   └── Method: addQuestion(jobId, userId, question)

🟠 Event: 問題已提交 (QuestionSubmitted)
   └── Payload: { questionId, jobId, userId, question, askedAt }

🟣 Policy: 當問題提交後
   └── 通知業主有新問題 (模擬)

🟢 Read Model: JobQuestions
   └── { questions[]: { question, askedBy, askedAt, hostReply? } }
```

---

### Story 3.3: 分享職缺

**User Story:**

> 作為一個使用者，我希望能夠將職缺分享給朋友，以便推薦好的換宿機會。

**Event Storming 流程：**

```
👤 Actor: 訪客 | 會員

🖥️ UI: 分享按鈕區
   ├── 複製連結
   ├── 分享到 Line
   └── 分享到 Facebook

🔵 Command: 複製連結 (CopyLink)
   └── Payload: { jobId, url }

🔵 Command: 分享到社群 (ShareToSocial)
   └── Payload: { jobId, platform: 'line' | 'facebook' }

🟠 Event: 連結已複製 (LinkCopied)

🟠 Event: 職缺已分享 (JobShared)
   └── Payload: { jobId, platform }

🟣 Policy: 複製連結後
   └── 顯示 Toast「連結已複製到剪貼簿」

🟢 Read Model: ShareData
   └── { url, ogTitle, ogDescription, ogImage }
```

---

## E4: 應徵媒合系統 (Application System)

### Story 4.1: 收藏職缺

**User Story:**

> 作為一個會員，我希望能夠收藏感興趣的職缺，以便日後比較和查看。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: 職缺卡片 / 詳情頁
   └── 愛心按鈕 (收藏/取消收藏)

🔵 Command: 收藏職缺 (SaveJob)
   └── Payload: { jobId }

🔵 Command: 取消收藏 (UnsaveJob)
   └── Payload: { jobId }

📋 Rule:
   ├── R4.1.1: 必須登入才能收藏
   ├── R4.1.2: 不可重複收藏同一職缺
   └── R4.1.3: 收藏上限 100 筆

🟡 Aggregate: UserFavorites
   └── Method: add(jobId) | remove(jobId)

🟠 Event: 職缺已收藏 (JobSaved)
   └── Payload: { userId, jobId, savedAt }

🟠 Event: 收藏已取消 (JobUnsaved)
   └── Payload: { userId, jobId }

🟣 Policy: 收藏/取消後
   ├── 更新愛心按鈕狀態
   └── 顯示 Toast 確認訊息

🟣 Policy: 未登入點擊收藏時
   └── 彈出登入 Modal

🟢 Read Model: SavedJobs
   └── { savedJobs[]: { jobId, savedAt } }
```

---

### Story 4.2: 提交應徵申請

**User Story:**

> 作為一個會員，我希望能夠應徵感興趣的職缺，以便開始媒合流程。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: Sticky Action Bar
   └── 「立即應徵」按鈕

🖥️ UI: 應徵確認 Modal
   ├── 個人資料預覽 (Profile Card)
   ├── 聯絡方式確認 (Line/Phone/Email)
   ├── 自我推薦信 (Cover Letter Textarea)
   └── 確認送出按鈕

🔵 Command: 開啟應徵視窗 (OpenApplicationModal)
   └── Payload: { jobId }

🔵 Command: 提交應徵 (SubmitApplication)
   └── Payload: { jobId, coverLetter, contactInfo }

📋 Rule:
   ├── R4.2.1: 必須登入才能應徵
   ├── R4.2.2: 必須完成 Onboarding
   ├── R4.2.3: 自我推薦信不得少於 50 字
   ├── R4.2.4: 同一職缺 7 天內不可重複應徵
   ├── R4.2.5: 職缺必須仍在招募中 (未過期/下架)
   └── R4.2.6: 驗證等級至少 L1 (Email 已驗證)

🟡 Aggregate: Application
   └── Method: submit(userId, jobId, coverLetter)

🟠 Event: 應徵已送出 (ApplicationSubmitted)
   └── Payload: { applicationId, userId, jobId, submittedAt, status: 'APPLIED' }

🟣 Policy: 當應徵送出後
   ├── 顯示成功 Modal「已送出，請靜候業主聯繫」
   ├── 新增至「應徵紀錄」
   ├── 發送通知給業主 (模擬)
   └── 導向會員中心 > 應徵管理

🟣 Policy: 未登入點擊應徵時
   ├── 記錄 returnUrl
   └── 彈出登入 Modal

🟣 Policy: 7 天內重複應徵時
   └── 顯示錯誤「您已在 7 天內應徵過此職缺」

🟢 Read Model: ApplicationForm
   └── { profile, contactInfo, savedCoverLetter? }
```

---

### Story 4.3: 追蹤應徵狀態

**User Story:**

> 作為一個會員，我希望能夠查看所有應徵紀錄的狀態，以了解媒合進度。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: 會員中心 > 應徵管理 Tab
   ├── 應徵列表
   │   ├── 職缺縮圖
   │   ├── 職缺標題
   │   ├── 送出日期
   │   └── 狀態標籤 (已送出/業主已讀/邀請面試)
   └── 篩選 (全部/進行中/已結束)

🔵 Command: 載入應徵紀錄 (LoadApplications)

📋 Rule:
   └── R4.3.1: 按送出時間倒序排列

🟡 Aggregate: ApplicationList
   └── Method: getByUser(userId)

🟠 Event: 應徵狀態已更新 (ApplicationStatusUpdated)
   └── Payload: { applicationId, newStatus, updatedAt }

🟣 Policy: 模擬狀態變化 (開發用)
   ├── 送出 24 小時後隨機變為「業主已讀」
   └── 48 小時後隨機變為「邀請面試」

🟣 Policy: 當狀態變化時
   └── 發送通知給使用者

🟢 Read Model: MyApplications
   └── { applications[]: { jobId, jobTitle, hostName, status, submittedAt } }
```

---

## E5: 評論互動系統 (Review System)

### Story 5.1: 撰寫職缺評論

**User Story:**

> 作為一個曾換宿的會員，我希望能夠為職缺撰寫評論，以分享我的真實體驗。

**Event Storming 流程：**

```
👤 Actor: 已換宿會員 (ExperiencedMember)

🖥️ UI: 評論撰寫區
   ├── 星等選擇 (1-5 星)
   ├── 結構化標籤勾選
   │   ├── 符合度: [工作與描述相符, 無隱藏收費]
   │   ├── 設施: [Wifi 穩, 住宿乾淨, 冷氣涼]
   │   └── 氛圍: (社交型/獨立型/精實型)
   ├── 文字心得 (Textarea)
   └── 發布按鈕

🔵 Command: 提交評論 (SubmitReview)
   └── Payload: { jobId, rating, tags[], checks{}, content }

📋 Rule:
   ├── R5.1.1: 必須登入
   ├── R5.1.2: 必須選擇星等
   ├── R5.1.3: 文字心得不得少於 20 字
   └── R5.1.4: 每人對同一職缺只能評論一次

🟡 Aggregate: Review
   └── Method: create(userId, jobId, rating, content, tags)

🟠 Event: 評論已發布 (ReviewPublished)
   └── Payload: { reviewId, userId, jobId, rating, tags, content, publishedAt }

🟣 Policy: 評論發布後
   ├── 重新計算職缺平均評分
   ├── 更新細項評分統計
   └── 通知業主有新評論

🟢 Read Model: JobReviews
   └── { averageRating, totalCount, ratingBreakdown{}, reviews[] }
```

---

### Story 5.2: 回覆評論

**User Story:**

> 作為一個業主或其他會員，我希望能夠回覆評論，以進行互動或澄清。

**Event Storming 流程：**

```
👤 Actor: 業主 (Host) | 已登入會員 (LoggedInMember)

🖥️ UI: 評論項目
   ├── 回覆按鈕
   └── 回覆輸入框 (展開後顯示)

🔵 Command: 提交回覆 (SubmitReply)
   └── Payload: { reviewId, content }

📋 Rule:
   ├── R5.2.1: 必須登入
   ├── R5.2.2: 回覆最多兩層 (不支援回覆的回覆)
   └── R5.2.3: 業主回覆需顯示「業主」標章

🟡 Aggregate: ReviewReply
   └── Method: addReply(reviewId, userId, content)

🟠 Event: 回覆已發布 (ReplyPublished)
   └── Payload: { replyId, reviewId, userId, isHost, content, publishedAt }

🟣 Policy: 回覆發布後
   └── 通知原評論者有人回覆

🟢 Read Model: ReviewWithReplies
   └── { review, replies[]: { replyId, author, isHost, content, date } }
```

---

## E6: 會員中心系統 (Member Dashboard System)

### Story 6.1: 管理收藏夾

**User Story:**

> 作為一個會員，我希望能夠查看和管理我收藏的職缺。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: 會員中心 > 收藏夾 Tab
   ├── 收藏職缺卡片列表
   └── 移除收藏按鈕

🔵 Command: 載入收藏夾 (LoadSavedJobs)

🔵 Command: 從收藏夾移除 (RemoveFromSaved)
   └── Payload: { jobId }

🟡 Aggregate: UserFavorites
   └── Method: remove(jobId)

🟠 Event: 收藏已移除 (JobRemovedFromSaved)
   └── Payload: { userId, jobId }

🟣 Policy: 收藏夾為空時
   └── 顯示 Empty State + 「去探索職缺」按鈕

🟢 Read Model: SavedJobsList
   └── { savedJobs[]: { job, savedAt } }
```

---

### Story 6.2: 編輯個人檔案

**User Story:**

> 作為一個會員，我希望能夠編輯我的個人資料，以維持資料正確性。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: 會員中心 > 個人設定 Tab
   ├── 大頭貼上傳
   ├── 暱稱輸入
   ├── 自我介紹 (Bio)
   ├── 技能標籤
   └── 聯絡方式

🔵 Command: 更新個人檔案 (UpdateProfile)
   └── Payload: { nickname, avatar, bio, skills[], contactInfo }

📋 Rule:
   ├── R6.2.1: 暱稱長度 2-20 字
   └── R6.2.2: 自我介紹最多 500 字

🟡 Aggregate: UserProfile
   └── Method: update(profileData)

🟠 Event: 個人檔案已更新 (ProfileUpdated)
   └── Payload: { userId, updatedFields, updatedAt }

🟢 Read Model: UserProfile
   └── { nickname, avatar, bio, skills[], contactInfo }
```

---

### Story 6.3: 重設偏好設定

**User Story:**

> 作為一個會員，我希望能夠重新設定我的偏好，以更新推薦內容。

**Event Storming 流程：**

```
👤 Actor: 已登入會員 (LoggedInMember)

🖥️ UI: 會員中心 > 個人設定
   └── 「重設偏好」按鈕

🔵 Command: 重設偏好 (ResetPreferences)

📋 Rule:
   └── R6.3.1: 重設後必須重新完成偏好設定

🟡 Aggregate: UserPreferences
   └── Method: reset()

🟠 Event: 偏好已重設 (PreferencesReset)
   └── Payload: { userId, resetAt }

🟣 Policy: 偏好重設後
   └── 導向 Onboarding Wizard (Story 1.4)

🟢 Read Model: UserPreferences
   └── { workTypes: [], accommodationPreference: null }
```

---

## E7: 通知系統 (Notification System)

### Story 7.1: 接收系統通知

**User Story:**

> 作為一個會員，我希望能夠接收系統通知，以了解重要資訊與互動回饋。

**Event Storming 流程：**

```
👤 Actor: 系統 (System) → 會員

🖥️ UI: Header 通知鈴鐺
   ├── 未讀紅點 Badge
   └── 下拉通知列表

🖥️ UI: 通知中心頁面
   ├── 全部 / 未讀 / 系統公告 (Tabs)
   └── 通知列表

🔵 Command: 載入通知 (LoadNotifications)

🔵 Command: 標記已讀 (MarkAsRead)
   └── Payload: { notificationId }

🟡 Aggregate: Notification
   └── Method: getByUser(userId)

🟠 Event: 通知已建立 (NotificationCreated)
   └── Types:
       ├── 應徵狀態變化
       ├── 評論有新回覆
       ├── 收藏職缺快到期
       └── 系統公告

🟣 Policy: 各種事件觸發通知
   ├── ApplicationStatusUpdated → 建立通知
   ├── ReplyPublished → 建立通知
   └── JobExpiring → 建立通知

🟢 Read Model: Notifications
   └── { notifications[], unreadCount }
```

---

## 規則總表 (Rules Summary)

### 會員驗證規則

| Rule ID | 規則描述                        | 適用 Story |
| ------- | ------------------------------- | ---------- |
| R1.1.1  | Email 格式必須正確              | 1.1        |
| R1.1.2  | 密碼長度至少 8 字元             | 1.1        |
| R1.1.3  | 確認密碼必須與密碼一致          | 1.1        |
| R1.1.4  | Email 不可重複註冊              | 1.1        |
| R1.1.5  | 必須同意服務條款                | 1.1        |
| R1.2.1  | Email 必須存在於系統中          | 1.2        |
| R1.2.2  | 密碼必須正確                    | 1.2        |
| R1.4.1  | 必須選擇至少一個工作類型        | 1.4        |
| R1.4.2  | 必須選擇住宿偏好                | 1.4        |
| R1.4.3  | Onboarding 為強制流程，不可跳過 | 1.4        |
| R1.5.1  | 手機號碼格式必須正確            | 1.5        |
| R1.5.2  | 驗證碼必須在 5 分鐘內輸入       | 1.5        |

### 搜尋篩選規則

| Rule ID | 規則描述                          | 適用 Story |
| ------- | --------------------------------- | ---------- |
| R2.1.1  | 未登入顯示熱門職缺 (依 viewCount) | 2.1        |
| R2.1.2  | 已登入顯示推薦職缺 (依偏好演算)   | 2.1        |
| R2.2.1  | 搜尋結果依相關度與熱門度混合排序  | 2.2        |
| R2.3.1  | 篩選器之間為 AND 關係             | 2.3        |
| R2.3.2  | 同一篩選器內的選項為 OR 關係      | 2.3        |
| R2.3.3  | 無結果時顯示放寬建議              | 2.3        |
| R2.4.1  | 地圖 Pin 點擊後顯示職缺小卡片     | 2.4        |
| R2.5.1  | 熱門依 viewCount 排序             | 2.5        |
| R2.5.2  | 最新依 postedDate 排序            | 2.5        |
| R2.5.3  | 每個泳道最多顯示 8 筆             | 2.5        |

### 職缺詳情規則

| Rule ID | 規則描述                              | 適用 Story |
| ------- | ------------------------------------- | ---------- |
| R3.1.1  | 瀏覽數 +1 (24hr 內不重複計算)         | 3.1        |
| R3.2.1  | 必須登入才能提問                      | 3.2        |
| R3.2.2  | 問題不得少於 10 字                    | 3.2        |
| R3.2.3  | 同一用戶對同職缺 24hr 內最多 3 則提問 | 3.2        |

### 應徵媒合規則

| Rule ID | 規則描述                    | 適用 Story |
| ------- | --------------------------- | ---------- |
| R4.1.1  | 必須登入才能收藏            | 4.1        |
| R4.1.2  | 不可重複收藏同一職缺        | 4.1        |
| R4.1.3  | 收藏上限 100 筆             | 4.1        |
| R4.2.1  | 必須登入才能應徵            | 4.2        |
| R4.2.2  | 必須完成 Onboarding         | 4.2        |
| R4.2.3  | 自我推薦信不得少於 50 字    | 4.2        |
| R4.2.4  | 同一職缺 7 天內不可重複應徵 | 4.2        |
| R4.2.5  | 職缺必須仍在招募中          | 4.2        |
| R4.2.6  | 驗證等級至少 L1             | 4.2        |
| R4.3.1  | 按送出時間倒序排列          | 4.3        |

### 評論互動規則

| Rule ID | 規則描述                   | 適用 Story |
| ------- | -------------------------- | ---------- |
| R5.1.1  | 必須登入才能評論           | 5.1        |
| R5.1.2  | 必須選擇星等               | 5.1        |
| R5.1.3  | 文字心得不得少於 20 字     | 5.1        |
| R5.1.4  | 每人對同一職缺只能評論一次 | 5.1        |
| R5.2.1  | 必須登入才能回覆           | 5.2        |
| R5.2.2  | 回覆最多兩層               | 5.2        |
| R5.2.3  | 業主回覆需顯示標章         | 5.2        |

### 會員中心規則

| Rule ID | 規則描述                   | 適用 Story |
| ------- | -------------------------- | ---------- |
| R6.2.1  | 暱稱長度 2-20 字           | 6.2        |
| R6.2.2  | 自我介紹最多 500 字        | 6.2        |
| R6.3.1  | 重設後必須重新完成偏好設定 | 6.3        |

---

## 策略總表 (Policies Summary)

### 認證與狀態相關策略

| Policy ID | 觸發事件                   | 執行動作                               |
| --------- | -------------------------- | -------------------------------------- |
| P1.1      | AccountCreated             | 強制啟動 Onboarding Wizard             |
| P1.2      | LoginSucceeded             | 檢查 Onboarding 完成狀態，未完成則導向 |
| P1.3      | LoginSucceeded + returnUrl | 導回原頁面                             |
| P1.4      | LoggedOut                  | 清除 localStorage session，導向首頁    |
| P1.5      | PreferencesSet             | 標記 onboardingCompleted，觸發推薦更新 |
| P1.6      | VerificationLevelUpgraded  | 更新標章顯示，發送恭喜通知             |

### 搜尋與瀏覽相關策略

| Policy ID | 觸發事件                      | 執行動作                                   |
| --------- | ----------------------------- | ------------------------------------------ |
| P2.1      | HomepageLoaded                | 根據登入狀態決定推薦邏輯                   |
| P2.2      | TypeSearch                    | 顯示智慧建議 (Recent/Trending/Suggestions) |
| P2.3      | FilterApplied + resultCount=0 | 顯示 Empty State + 放寬建議                |
| P2.4      | ViewModeChanged(map)          | 載入地圖 API 並渲染 Pin                    |

### 職缺互動相關策略

| Policy ID | 觸發事件          | 執行動作                             |
| --------- | ----------------- | ------------------------------------ |
| P3.1      | JobViewed         | 更新 viewCount，已登入則加入最近瀏覽 |
| P3.2      | QuestionSubmitted | 通知業主有新問題                     |
| P3.3      | LinkCopied        | 顯示 Toast 確認                      |

### 應徵相關策略

| Policy ID | 觸發事件                      | 執行動作                                         |
| --------- | ----------------------------- | ------------------------------------------------ |
| P4.1      | SaveJob + 未登入              | 彈出登入 Modal                                   |
| P4.2      | JobSaved/JobUnsaved           | 更新愛心狀態，顯示 Toast                         |
| P4.3      | OpenApplicationModal + 未登入 | 記錄 returnUrl，彈出登入 Modal                   |
| P4.4      | ApplicationSubmitted          | 顯示成功 Modal，新增至紀錄，通知業主，導向儀表板 |
| P4.5      | 7 天內重複應徵                | 顯示錯誤訊息                                     |
| P4.6      | 24hr 後 (模擬)                | 隨機更新狀態為「業主已讀」                       |
| P4.7      | ApplicationStatusUpdated      | 發送通知給使用者                                 |

### 評論相關策略

| Policy ID | 觸發事件        | 執行動作                         |
| --------- | --------------- | -------------------------------- |
| P5.1      | ReviewPublished | 重算平均評分，更新統計，通知業主 |
| P5.2      | ReplyPublished  | 通知原評論者                     |

### 會員中心相關策略

| Policy ID | 觸發事件                 | 執行動作               |
| --------- | ------------------------ | ---------------------- |
| P6.1      | SavedJobsList.length = 0 | 顯示 Empty State       |
| P6.2      | PreferencesReset         | 導向 Onboarding Wizard |

### 通知相關策略

| Policy ID | 觸發事件                 | 執行動作 |
| --------- | ------------------------ | -------- |
| P7.1      | ApplicationStatusUpdated | 建立通知 |
| P7.2      | ReplyPublished           | 建立通知 |
| P7.3      | JobExpiring (收藏的)     | 建立通知 |

---

## Aggregate 總覽

| Aggregate            | 職責           | 關聯 Story    |
| -------------------- | -------------- | ------------- |
| **User**             | 會員帳號管理   | 1.1, 1.2, 1.3 |
| **UserProfile**      | 個人檔案與偏好 | 1.4, 6.2      |
| **UserPreferences**  | 偏好設定       | 1.4, 6.3      |
| **UserVerification** | 驗證等級管理   | 1.5           |
| **UserFavorites**    | 收藏夾管理     | 4.1, 6.1      |
| **Session**          | 登入狀態管理   | 1.2, 1.3      |
| **JobCatalog**       | 職缺目錄查詢   | 2.1, 2.3, 2.5 |
| **SearchEngine**     | 搜尋引擎       | 2.2           |
| **MapView**          | 地圖視圖       | 2.4           |
| **Job**              | 單一職缺       | 3.1           |
| **JobQnA**           | 職缺問答       | 3.2           |
| **Application**      | 應徵申請       | 4.2           |
| **ApplicationList**  | 應徵紀錄列表   | 4.3           |
| **Review**           | 評論           | 5.1           |
| **ReviewReply**      | 評論回覆       | 5.2           |
| **Notification**     | 通知           | 7.1           |

---

## Read Model 總覽

| Read Model             | 用途         | 資料內容                                          |
| ---------------------- | ------------ | ------------------------------------------------- |
| **CurrentUser**        | 當前登入狀態 | userId, email, isLoggedIn, verificationLevel      |
| **UserPreferences**    | 使用者偏好   | workTypes[], accommodationPreference              |
| **UserProfile**        | 個人檔案     | nickname, avatar, bio, skills[]                   |
| **UserVerification**   | 驗證狀態     | verificationLevel, badges[]                       |
| **HomepageContent**    | 首頁內容     | featuredJobs[], recentlyViewed[], testimonials[]  |
| **SearchSuggestions**  | 搜尋建議     | recent[], trending[], suggestions[]               |
| **SearchResults**      | 搜尋結果     | jobs[], totalCount, appliedFilters                |
| **FilteredJobs**       | 篩選後職缺   | jobs[], appliedFilters                            |
| **MapData**            | 地圖資料     | pins[]: { jobId, lat, lng }                       |
| **DiscoverySwimlanes** | 探索泳道     | byCategory, featured, popular, byLocation, newest |
| **JobDetail**          | 職缺詳情     | job, conditions, living, houseRules, reviews[]    |
| **JobQuestions**       | 職缺問答     | questions[]                                       |
| **ShareData**          | 分享資料     | url, ogTitle, ogDescription, ogImage              |
| **SavedJobs**          | 收藏列表     | savedJobs[]                                       |
| **ApplicationForm**    | 應徵表單     | profile, contactInfo                              |
| **MyApplications**     | 我的應徵     | applications[]                                    |
| **JobReviews**         | 職缺評論     | averageRating, reviews[]                          |
| **ReviewWithReplies**  | 評論與回覆   | review, replies[]                                 |
| **SavedJobsList**      | 收藏夾列表   | savedJobs[]                                       |
| **Notifications**      | 通知列表     | notifications[], unreadCount                      |

---

> **文件結束**  
> 此份事件風暴分析文件基於 Builder 101 PRD，完整拆解了 7 個 Epic、21 個 Story，並包含完整的 Rules、Policies、Aggregates 與 Read Models 定義。

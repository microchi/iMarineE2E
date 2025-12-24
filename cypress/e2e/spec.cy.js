// const { multiply } = require('cypress/types/lodash');

describe('iMarine 航港發展資料庫 整合測試', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
  });

  it('點擊關於我們 會 進入關於我們', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_0').click();

    cy.contains('h2', '關於我們').should('be.visible');
  });

  it('點擊搜尋 會 進入全站搜尋', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');

    cy.get('.no-print > .pi-search').click();

    cy.contains('h2', '全站搜尋').should('be.visible');
  });

  it('全站搜尋', () => {
    cy.intercept('GET', '**/api/news/search*').as('searchAPI');
    cy.visit('https://imarine.motcmpb.gov.tw/#/search');
    cy.get('input[title="搜尋框"]').type('航線');
    cy.contains('button', '搜尋').click();
    cy.wait('@searchAPI').its('response.statusCode').should('eq', 200);

    cy.get('.tag-choose-layout').should('be.visible').and('contain.text', '全球航運指數');
  });

  it('點擊首頁側欄icon - 簡易查詢 會 切換到對應頁面', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('li[title="簡易查詢"]').click();

    cy.get('#simple-statistics > .container > .section-title').should('be.visible').and('have.text', '臺灣數據統計-簡易查詢');
  });

  it('點擊首頁側欄icon - 航港法令 會 切換到對應頁面', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('li[title="航港法令').click();

    cy.get('.row > .section-title').should('be.visible').and('contain.text', '航港法令');
  });

  it('點擊臺灣數據統計 會 進入快捷查詢', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_2_0_0_0 a').click({ force: true });

    cy.url().should('include', '/statistics/0/0');
    cy.contains('快捷查詢 - 臺灣前十大進口貨櫃港').should('be.visible');
  });

  it('快捷轉自訂', () => {
    cy.intercept('POST', 'api/chart').as('chartAPI');
    cy.visit('https://imarine.motcmpb.gov.tw/#/statistics/0/0');

    cy.wait('@chartAPI').then(() => {
      cy.get('.statistics-content  [aria-label="自訂查詢"]').click();
      cy.contains('自訂維度').should('be.visible');
    });
  });

  it('點擊快捷報表報表側欄 會 顯示報表 ', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/statistics/5/0');
    cy.get('a[role="button"]').contains('貨櫃').filter(':visible').click();
    cy.get('.statistics-second-title').contains('進口/TEU').filter(':visible').click();

    cy.contains('快捷查詢 - 臺灣前十大進口貨櫃港').should('be.visible');
  });

  it('點擊首頁臺灣航運指數卡片 會 顯示航運指數', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#points').contains('國籍船舶總噸100以上登記數').click({ focus: true });

    cy.contains('button', '重置縮放').should('be.visible');
  });

  it('點擊臺灣數據統計-簡易查詢-港口 會 進入國際商港貨物吞吐量(萬公噸)', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_2_1_0_2 a').click({ force: true });

    cy.contains('國際商港貨物吞吐量(萬公噸)').should('be.visible');
  });

  it('點擊臺灣數據統計 會 進入自訂查詢', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_2_2 a').click({ force: true });

    cy.contains('自訂維度選項').should('be.visible');
  });

  it('點擊海運焦點新聞 會 進入海運焦點新聞', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_3 > div > a ').click();
    cy.get('ul[aria-labelledby="topbar_3_label"]').within(() => {
      cy.contains('全部').should('be.visible');
      cy.contains('港口').should('be.visible');
      cy.contains('航商').should('be.visible');
      cy.contains('船員').should('be.visible');
      cy.contains('船舶').should('be.visible');
      cy.contains('環境').should('be.visible');
      cy.contains('社論').should('be.visible');
    });
  });

  it('點擊海運焦點新聞-港口 會 進入港口類新聞', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_3_1 > div > a > div > div > span').click({ force: true });

    cy.contains('h2', '海運焦點新聞').should('be.visible');
  });

  it('點擊航港法令 會 進入航港法令目錄', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_4').click();

    cy.get('#topbar_4 [aria-labelledby="topbar_4_label"]').within(() => {
      cy.contains('航港法令索引').should('be.visible');
      cy.contains('法令').should('be.visible');
      cy.contains('公告').should('be.visible');
      cy.contains('司法判解').should('be.visible');
    });
  });

  it('點擊航港法令-航務法令 會 進入航務法令', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_4').click();
    cy.get('#topbar_4').contains('a', '航港法令索引').click();

    cy.contains('h2', '航港法令').should('be.visible');
  });

  it('點擊航務法令 會 出現航務法令', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('a[title="航務法令"]').click({ force: true });

    cy.contains('h2', '航務法令').should('be.visible');
  });

  it('點擊訊息分享>重要公告 會 進入重要公告', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_5_0 > div > a > div > div > span').click({ force: true });

    cy.contains('h2', '重要公告').should('be.visible');
  });

  it('點擊海運組織 會 進入國外海運組織', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_6 > div > a > span').click();

    cy.contains('h2', '國外海運組織').should('be.visible');
  });

  it('點擊海運組織 會 進入國內海運組織', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_6').contains('a', '海運組織').click({ force: true });

    cy.contains('國內海運公協會').scrollIntoView().should('be.visible');
  });

  it('點擊船舶即時資訊 會 進入船舶即時資訊', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#simple-statistics  :nth-child(3) > .cursor-pointer').click({ force: true });

    cy.contains('h2', '船舶即時資訊').should('be.visible');
  });

  it('點擊24小時泊靠時間分析 會 進入24小時泊靠時間分析', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#simple-statistics  div:nth-child(4) > .cursor-pointer').click({ force: true });

    cy.contains('h2', '24小時泊靠時間分析').should('be.visible');
  });

  it('點擊30大貨櫃航商 會 進入30大貨櫃航商', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#simple-statistics  div:nth-child(2) > .cursor-pointer').click({ force: true });

    cy.contains('h2', '30大貨櫃航商').should('be.visible');
  });

  it('點擊行經臺灣貨櫃航線灣靠港口圖 會 進入行經臺灣貨櫃航線灣靠港口圖', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#simple-statistics  div:nth-child(1) > .cursor-pointer').click({ force: true });

    cy.contains('h2', '行經臺灣貨櫃航線灣靠港口圖').should('be.visible');
  });

  it('自訂查詢儲存報表時 會 登入並儲存名稱是test的報表', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/custom');
    cy.get('.p-dialog-footer > .p-button > .p-button-label').click();
    cy.get('nav').contains('button', '登入').click();
    cy.get(':nth-child(1) > .p-inputtext').should('be.visible').type('test@gmail.com', { force: true });
    cy.get(':nth-child(2) > .p-inputtext').type('123456', { force: true });
    cy.get('.mt-3.text-center > .p-button').should('be.visible').click({ force: true });
    cy.get('.swal2-confirm').contains('OK').click();
    cy.get('body')
      .then((o) => {
        // 若 有我的報表
        if (o.find('.p-card.mb-2 > .p-card-body > .p-card-content > :nth-child(1)').length) {
          // 若 有名稱是test的報表 則 刪除
          cy.get('.p-tag').each((p) => {
            if (p.find('.text-base').text().includes('test')) {
              cy.wrap(p).find('.pi.pi-times').click();
              cy.get('.swal2-confirm').click();
            }
          });
        }
      })
      .then(() => {
        cy.get('[aria-label="儲存報表"] > .p-button-label').click();
        cy.get('#MyReportName').type('test');
        cy.get('[aria-label="儲存"] > .p-button-label').click();
      });
    cy.get('.p-card.mb-2 > .p-card-body > .p-card-content > :nth-child(1)').contains('test');
    cy.get('.p-tag').each((p) => {
      // 若 有名稱是test的報表 則 刪除
      if (p.find('.text-base').text().includes('test')) {
        cy.wrap(p).find('.pi.pi-times').click();
        cy.get('.swal2-confirm').click();
      }
    });
  });

  it('在法規頁點擊友善列印 會 打開友善列印', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/lawdetail/1/1');
    cy.window().then((win) => cy.stub(win, 'print').as('myPrint'));
    cy.get('[aria-label="友善列印"] > .p-button-label').click();

    cy.get('@myPrint').should('have.been.called');
  });

  it('在搜尋頁查詢關鍵字 會 搜尋關鍵字並反白顯示', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/search');
    cy.get('.p-inputtext').type('巴拿馬運河');
    cy.get('#app .view-background .justify-content-center button').click();

    cy.contains('巴拿馬運河').should('be.visible').and('have.css', 'background-color', 'rgb(255, 255, 0)');
  });

  it('點擊郵輪旅客國籍 會 進入郵輪旅客國籍', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_2_0_3_5  a  span').click({ force: true });

    cy.contains('h2', '快捷查詢 - 臺灣郵輪旅客各國籍人次').should('be.visible');
  });

  it('點擊海港自由港區進口貿易值貿易量 會 進入海港自由港區進口貿易值貿易量', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_2_0_4_0  a  span').click({ force: true });

    cy.contains('h2', '快捷查詢 - 海港自由港區進口貿易值貿易量').should('be.visible');
  });

  it('點擊臺灣進出口國輪外輪承運量 會 進入臺灣進出口國輪外輪承運量', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_2_0_1_6  a  span').click({ force: true });

    cy.contains('h2', '快捷查詢 - 臺灣進出口國輪外輪承運量').should('be.visible');
  });

  it('點擊航港小知識 會 進入航港小知識', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#topbar_5_1 > div  a  span').click({ force: true });

    cy.contains('h2', '航港小知識').should('be.visible');
  });

  it('點擊航港法令 會 進入航港法令', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('a[title="航港法令索引"]').click({ force: true });

    cy.contains('h4', '近期法令異動').should('be.visible');
  });

  it('點擊港口比較 會 進入港口比較', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/portlist');
    cy.get('.p-button').contains('加入比較').click();
    cy.get('.p-button').contains('加入比較').click();
    cy.get('.info').contains('前往比較').click();

    cy.contains('h2', '港口比較').should('be.visible');
  });

  it('點擊前十大進出口空實櫃貨櫃港 會 進入前十大進出口空實櫃貨櫃港', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('a[title= "臺灣前十大實櫃進口貨櫃港"]').click({ force: true });

    cy.contains('h2', '快捷查詢 - 臺灣前十大實櫃進口貨櫃港').should('be.visible');
  });

  it('點擊近十年航港局執行港口國管制檢查績效統計 會 進入近十年航港局執行港口國管制檢查績效統計', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('a[title = "近十年航港局執行港口國管制檢查績效統計"]').click({ force: true });

    cy.contains('h2', '近十年航港局執行港口國管制檢查績效統計').should('be.visible');
  });

  it('點擊近十年航港局執行港口國管制檢查績效統計 會 進入近十年航港局執行港口國管制檢查績效統計', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('a[title = "近十年航港局執行港口國管制檢查缺失類型統計"]').click({ force: true });

    cy.contains('h2', '近十年航港局執行港口國管制檢查缺失類型統計').should('be.visible');
  });

  it('點擊新聞關鍵字訂閱功能時 會 登入訂閱關鍵字並確認會員資料中訂閱的關鍵字', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/news/subscription');
    cy.get('.swal2-actions > button').contains('OK').click();
    cy.get('input[placeholder="Email"]').should('be.visible').type('test@gmail.com', { force: true });
    cy.get('.row > :nth-child(2) > .p-inputtext').type('123456', { force: true });
    cy.get('.mt-3.text-center > .p-button').click();
    cy.get('.swal2-actions > button').contains('OK').click();
    cy.get('.p-chips-input-token > input').should('be.visible').type('港口', { force: true }).type('{enter}');
    cy.get('button').contains('儲存').click();
    cy.get('.swal2-actions > button').contains('OK').click();
    cy.get('.p-card-content > .flex-column > :nth-child(2)').click();

    cy.get('.p-chips > .p-inputtext').contains('港口').should('be.visible');
  });
});

// const { multiply } = require("cypress/types/lodash");

describe('iMarine 航港發展資料庫 整合測試', () => {
  it('點擊關於我們 會 進入關於我們', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#navbar > :nth-child(1) > :nth-child(1) > .nav-link > :nth-child(1)').click();

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('關於我們');
    });
  });

  it('點擊搜尋 會 進入全站搜尋', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');

    cy.get('.no-print > .pi-search').click({ force: true });

    cy.contains('全站搜尋');
  });

  it('全站搜尋', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/search');
    cy.get('.p-inputtext').type('航線');
    cy.get('.p-button-label').click({ force: true });

    cy.contains('全站搜尋');
  });

  it('點擊首頁側欄icon - 簡易查詢 會切換到對應頁面', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(2) > .nav-link > .mr-1').click({ force: true });

    cy.get('#simple-statistics > .container > .section-title').then((element) => {
      expect(element.text()).to.equal('臺灣數據統計-簡易查詢');
    });
  });

  it('點擊首頁側欄icon - 航港法令 會切換到對應頁面', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#sidenavbar > ul > :nth-child(4) > .nav-link').click({ force: true });

    cy.get('.row > .section-title').then((element) => {
      expect(element.text()).to.equal('航港法令');
    });
  });

  it('點擊全球航運指數 會 進入 運價指數', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#navbar > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1)').click();
    cy.contains('運價指數');
  });

  it('點擊台灣數據統計 會 進入 快捷報表', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#navbar > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(1)').click();

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('快捷查詢 - 臺灣前十大進口貨櫃港');
    });
  });

  it('快捷轉自訂', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/statistics/2/0');
    cy.intercept('POST', 'api/chart').as('chartAPI');
    cy.wait('@chartAPI').then(() => {
      cy.get('[aria-label="自訂查詢"]').click({ force: true });

      cy.contains('自訂維度',{ timeout: 8000 });
    });
  });

  it('點擊快捷報表報表側欄 會顯示報表 ', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/statistics/0/0');

    cy.contains('快捷查詢 - 臺灣前十大進口貨櫃港');
  });

  it('點擊首頁台灣航運指數卡片 會顯示 航運指數', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/points/100TCount');

    cy.get('.p-dialog-title').then((element) => {
      cy.contains('國籍船舶總噸100以上登記數');
    });
  });

  it('點擊台灣數據統計-簡易查詢-港口 會 進入 國際商港貨物吞吐量(萬公噸)', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/throughput');

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('國際商港貨物吞吐量(萬公噸)');
    });
  });

  it('點擊台灣數據統計 會 進入自訂查詢', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/custom');

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('自訂查詢');
    });
  });

  it('點擊首頁 台灣數據統計-簡易查詢 臺灣空實貨櫃出港TEU數  會 進入臺灣空實貨櫃出港TEU數', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/emptyrealexport');

    cy.contains('出港的空實貨櫃TEU數');
  });

  it('點擊海運焦點新聞 會 進入 海運焦點新聞', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#navbar > :nth-child(1) > :nth-child(4) > :nth-child(1) > :nth-child(1)').click();
    cy.contains('海運焦點新聞');
    cy.contains('全部');
    cy.contains('港口');
    cy.contains('航商');
    cy.contains('船員');
    cy.contains('船舶');
    cy.contains('環境');
    cy.contains('社論');
  });

  it('點擊海運焦點新聞-港口 會 進入 港口類新聞', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#navbar > ul > li:nth-child(4) > ul > div:nth-child(2) > li > a').click({ force: true });
    cy.contains('海運焦點新聞');
  });

  it('點擊航港法令 會 進入 航港法令目錄', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/lawindex');

    cy.contains('航務法令');
  });

  it('點擊航港法令 - 航務法令 會 進入 航務法令', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#navbar > ul > li:nth-child(5) > ul > div:nth-child(1) > li > a > span:nth-child(1)').click({ force: true });

    cy.contains('航務法令');
  });

  it('點擊航務法令 會 出現航務法令', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/law/1');

    cy.contains('航務法令');
  });

  it('點擊訊息分享 會 進入 重要公告', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#navbar > ul > li:nth-child(6) > ul > div:nth-child(1) > li > a > span:nth-child(1)').click({ force: true });

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('重要公告');
    });
  });

  it('點擊海運組織 會 進入 國外海運組織', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#navbar > :nth-child(1) > :nth-child(7) > .nav-link > :nth-child(1)').click({ force: true });
    cy.contains('國外海運組織');
  });

  it('點擊海運組織 會 進入 國內海運組織', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/organization');

    cy.contains('國內海運公協會').scrollIntoView().should('be.visible');
  });
});

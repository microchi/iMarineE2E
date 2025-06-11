// const { multiply } = require('cypress/types/lodash');

describe('iMarine 航港發展資料庫 整合測試', () => {
  it('點擊關於我們 會 進入關於我們', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(1) > a > span:nth-child(1)').click();

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

  it('點擊首頁側欄icon - 簡易查詢 會 切換到對應頁面', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(2) > .nav-link > .mr-1').click({ force: true });

    cy.get('#simple-statistics > .container > .section-title').then((element) => {
      expect(element.text()).to.equal('臺灣數據統計-簡易查詢');
    });
  });

  it('點擊首頁側欄icon - 航港法令 會 切換到對應頁面', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#sidenavbar > ul > :nth-child(4) > .nav-link').click({ force: true });

    cy.get('.row > .section-title').then((element) => {
      expect(element.text()).to.equal('航港法令');
    });
  });

  it('點擊臺灣數據統計 會 進入快捷報表', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(3) > a > span:nth-child(1)').click();

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('快捷查詢 - 臺灣前十大進口貨櫃港');
    });
  });

  it('快捷轉自訂', () => {
    cy.intercept('POST', 'api/chart').as('chartAPI');
    cy.visit('https://imarine.motcmpb.gov.tw/#/statistics/5/0');
    cy.wait('@chartAPI').then(() => {
      cy.get('[aria-label="自訂查詢"]').click({ force: true });
      cy.contains('自訂維度');
    });
  });

  it('點擊快捷報表報表側欄 會 顯示報表 ', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/statistics/0/0');

    cy.contains('快捷查詢 - 臺灣前十大進口貨櫃港');
  });

  it('點擊首頁臺灣航運指數卡片 會 顯示航運指數', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/points/100TCount');

    cy.get('.p-dialog-title').then((element) => {
      cy.contains('國籍船舶總噸100以上登記數');
    });
  });

  it('點擊臺灣數據統計-簡易查詢-港口 會 進入國際商港貨物吞吐量(萬公噸)', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/throughput');

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('國際商港貨物吞吐量(萬公噸)');
    });
  });

  it('點擊臺灣數據統計 會 進入自訂查詢', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/custom');

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('自訂查詢');
    });
  });

  it('點擊海運焦點新聞 會 進入海運焦點新聞', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(4) > a > span:nth-child(1)').click();
    cy.contains('海運焦點新聞');
    cy.contains('全部');
    cy.contains('港口');
    cy.contains('航商');
    cy.contains('船員');
    cy.contains('船舶');
    cy.contains('環境');
    cy.contains('社論');
  });

  it('點擊海運焦點新聞-港口 會 進入港口類新聞', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(4) > a > span:nth-child(1)').click();
    cy.contains('海運焦點新聞');
  });

  it('點擊航港法令 會 進入航港法令目錄', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/lawindex');

    cy.contains('航務法令');
  });

  it('點擊航港法令-航務法令 會 進入航務法令', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(5) > a > span:nth-child(1)').click({ force: true });

    cy.contains('航務法令');
  });

  it('點擊航務法令 會 出現航務法令', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/law/1');

    cy.contains('航務法令');
  });

  it('點擊訊息分享>重要公告 會 進入重要公告', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(6) > ul > div:nth-child(1) > li > a > span:nth-child(1)').click({ force: true });

    cy.get('.view-title > .font-bold').then((element) => {
      expect(element.text()).to.equal('重要公告');
    });
  });

  it('點擊海運組織 會 進入國外海運組織', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(7) > a > span:nth-child(1)').click();
    cy.contains('國外海運組織');
  });

  it('點擊海運組織 會 進入國內海運組織', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/organization');

    cy.contains('國內海運公協會').scrollIntoView().should('be.visible');
  });

  it('點擊船舶即時資訊 會 進入船舶即時資訊', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(5) > ul > :nth-child(1) > a > span').click({ force: true });

    cy.contains('船舶即時資訊');
  });

  it('點擊24小時泊靠時間分析 會 進入24小時泊靠時間分析', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(5) > ul > :nth-child(2) > a > span').click({ force: true });

    cy.contains('24小時泊靠時間分析');
  });

  it('點擊30大貨櫃航商 會 進入30大貨櫃航商', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(3) > :nth-child(2) > :nth-child(1) > .nav-link > span').click({ force: true });

    cy.contains('30大貨櫃航商');
  });

  it('點擊行經臺灣貨櫃航線灣靠港口圖 會 進入行經臺灣貨櫃航線灣靠港口圖', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(1) > ul > :nth-child(1) > a > span').click({ force: true });

    cy.contains('行經臺灣貨櫃航線灣靠港口圖');
  });

  it('自訂查詢儲存報表時 會 登入並儲存名稱是test的報表', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/custom');
    cy.get('.p-dialog-footer > .p-button > .p-button-label').click();
    cy.get('.login-box > div> .bi-person').click();
    cy.get('div > .login-button').contains(' 登入 ').click();
    cy.get(':nth-child(1) > .p-inputtext').type('test@gmail.com', { force: true });
    cy.get(':nth-child(2) > .p-inputtext').type('123456', { force: true });
    cy.get('.mt-3.text-center > .p-button').click({ force: true });
    cy.get('.swal2-confirm');
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
    cy.get('.p-button-label').click();

    cy.get(':nth-child(1) > .result-name').then((element) => expect(element.find('span').length).to.be.eq(2));
  });

  it('點擊郵輪旅客國籍 會 進入郵輪旅客國籍', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(4) > ul > :nth-child(6) > a > span').click({ force: true });

    cy.contains('快捷查詢 - 臺灣郵輪旅客各國籍人次');
  });

  it('點擊海港自由港區進口貿易值貿易量 會 進入海港自由港區進口貿易值貿易量', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(3) > ul > div:nth-child(1) > li > ul > li:nth-child(5) > ul > li:nth-child(1) > a > span').click({ force: true });

    cy.contains('快捷查詢 - 海港自由港區進口貿易值貿易量');
  });

  it('點擊臺灣進出口國輪外輪承運量 會 進入臺灣進出口國輪外輪承運量', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(2) > ul > :nth-child(7) > a > span').click({ force: true });

    cy.contains('快捷查詢 - 臺灣進出口國輪外輪承運量');
  });

  it('點擊航港小知識 會 進入航港小知識', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(6) > ul > div:nth-child(2) > li > a > span:nth-child(1)').click({ force: true });

    cy.contains('航港小知識');
  });

  it('點擊航港法令 會 進入航港法令', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get('#header > div > nav > ul > li:nth-child(5) > a > span:nth-child(1)').click();

    cy.contains('近期法令異動');
  });

  it('點擊港口比較 會 進入港口比較', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/portlist');
    cy.get('.p-button').contains('加入比較').click();
    cy.get('.p-button').contains('加入比較').click();
    cy.get('.info').contains('前往比較').click();

    cy.contains('比較項目');
  });

  it('點擊前十大進出口空實櫃貨櫃港 會 進入前十大進出口空實櫃貨櫃港', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1) > ul > :nth-child(2) > a > span').click({ force: true });

    cy.contains('快捷查詢 - 臺灣前十大實櫃進口貨櫃港');
  });

  it('點擊近十年航港局執行港口國管制檢查績效統計 會 進入近十年航港局執行港口國管制檢查績效統計', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(5) > ul > :nth-child(7) > a > span').click({ force: true });

    cy.contains('近十年航港局執行港口國管制檢查績效統計');
  });

  it('點擊近十年航港局執行港口國管制檢查績效統計 會 進入近十年航港局執行港口國管制檢查績效統計', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/');
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(5) > ul > :nth-child(8) > a > span').click({ force: true });

    cy.contains('近十年航港局執行港口國管制檢查缺失類型統計');
  });

  it('點擊新聞關鍵字訂閱功能時 會 登入訂閱關鍵字並確認會員資料中訂閱的關鍵字', () => {
    cy.visit('https://imarine.motcmpb.gov.tw/#/news/subscription');
    cy.get('.swal2-actions > button').contains('OK').click();
    cy.get('.row > :nth-child(1) >.p-inputtext').type('test@gmail.com');
    cy.get('.row > :nth-child(2) > .p-inputtext').type('123456');
    cy.get('.mt-3.text-center > .p-button').click();
    cy.get('.swal2-actions > button').contains('OK').click();
    cy.get('.p-chips-input-token > input').type('港口', { force: true }).type('{enter}');
    cy.get('button').contains('儲存').click();
    cy.get('.swal2-actions > button').contains('OK').click();
    cy.get('.p-card-content > .flex-column > :nth-child(2)').click();

    cy.get('.p-chips > .p-inputtext').contains('港口');
  });
});

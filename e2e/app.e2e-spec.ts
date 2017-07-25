import { AdminSalsaborPage } from './app.po';

describe('admin-salsabor App', () => {
  let page: AdminSalsaborPage;

  beforeEach(() => {
    page = new AdminSalsaborPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { SeriesCollectionPage } from './app.po';

describe('series-collection App', function() {
  let page: SeriesCollectionPage;

  beforeEach(() => {
    page = new SeriesCollectionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

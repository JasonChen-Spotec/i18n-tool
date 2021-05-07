import { getFlatMenuKeys, getDefaultCollapsedSubMenus, getSelectedMenuKeys } from '@/shared/components/Menu/menuUtils';

describe('menuUtils', () => {
  it('getFlatMenuKeys', () => {
    const menusData = [
      {
        path: '/list',
        icon: 'table',
        name: 'List',
        locale: 'menu.list',
        authority: [
          'admin',
          'user'
        ],
        children: [
          {
            path: '/list/table-list',
            name: 'Search Table',
            exact: true,
            locale: 'menu.list.searchtable'
          },
          {
            path: '/list/search',
            name: 'Search List',
            locale: 'menu.list.searchlist',
            children: [
              {
                path: '/list/search/articles',
                name: 'Search List(articles)',
                exact: true,
                locale: 'menu.list.searchlist.articles'
              }
            ]
          }
        ]
      }
    ];

    expect(getFlatMenuKeys(menusData)).toEqual(['/list', '/list/table-list', '/list/search', '/list/search/articles']);
  });

  it('getDefaultCollapsedSubMenus ', () => {
    const flatMenuKeys = ['/list', '/list/table-list', '/list/search', '/list/search/articles', ''];

    expect(getDefaultCollapsedSubMenus('/list/search/articles', flatMenuKeys)).toEqual(['/list', '/list/search', '/list/search/articles']);
  });

  it('getSelectedMenuKeys', () => {
    const flatMenuKeys = ['/list', '/list/table-list', '/list/search', '/list/search/articles'];

    expect(getSelectedMenuKeys('/list/search', flatMenuKeys)).toEqual(['/list', '/list/search']);
  });
});

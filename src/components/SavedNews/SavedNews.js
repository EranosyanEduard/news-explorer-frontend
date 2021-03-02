import React, { useContext } from 'react';
import CurrentUser from '../../contexts/currentUser';
import Page from '../Page/Page';
import AccountInfo from '../AccountInfo/AccountInfo';

function SavedNews({ news, ...pageProps }) {
  const { name } = useContext(CurrentUser);

  // Define AccountInfo component props
  const getAccountInfoProps = () => {
    const getHeadingText = (values) => {
      const headingTextTemplate = `{0}, у вас {1} сохраненн{2} стат{3}`;
      return headingTextTemplate.replace(/[\d{}]/g, (match) => (
        /\d/.test(match)
          ? [name, Array.isArray(news) ? news.length : 'нет', ...values][match]
          : ''
      ));
    };
    const getKeywordContent = (keywords) => (
      <>
        {'По ключевым словам: '}
        {keywords.map(([kwd], index) => (
          <em key={index} className="account__keyword">{kwd}</em>
        ))}
      </>
    );

    if (!news) {
      return {
        headingText: getHeadingText(['ых', 'ей']),
        keywordContent: 'Нет ключевых слов',
      };
    }

    // Define text content
    const headingTextTest1 = news.length % 10;
    const headingTextTest2 = news.length % 100;
    let headingText;
    let keywordContent;

    // Heading
    if (headingTextTest1 === 1 && headingTextTest2 !== 11) {
      headingText = getHeadingText(['ая', 'ья']);
    } else if ([2, 3, 4].includes(headingTextTest1)
      && ![12, 13, 14].includes(headingTextTest2)) {
      headingText = getHeadingText(['ые', 'ьи']);
    } else {
      headingText = getHeadingText(['ых', 'ей']);
    }

    // Keywords and number of keywords
    const keywordStats = news.reduce((acc, { keyword }) => {
      if (keyword in acc) {
        acc[keyword]++;
      } else {
        acc[keyword] = 1;
      }
      return acc;
    }, {});
    // Keywords in decrease order
    const sortedKeywords = Object.entries(keywordStats)
      .sort((kwd1, kwd2) => kwd2[1] - kwd1[1]);

    // Define last keyword
    if (sortedKeywords.length > 3) {
      const displayedKeywordsLimit = 2;
      const keywordsOverLimit = sortedKeywords.length - displayedKeywordsLimit;
      let keywordTextEnd;

      if (keywordsOverLimit % 10 > 1 || keywordsOverLimit % 100 === 11) {
        keywordTextEnd = 'другим';
      } else {
        keywordTextEnd = 'другому';
      }

      keywordContent = getKeywordContent([
        ...sortedKeywords.slice(0, displayedKeywordsLimit),
        [`и ${keywordsOverLimit} ${keywordTextEnd}`]
      ]);
    } else {
      keywordContent = getKeywordContent(sortedKeywords);
    }

    return { headingText, keywordContent };
  };

  return (
    <Page
      {...pageProps}
      lastElementChildToHeader={<AccountInfo {...getAccountInfoProps()} />}
      libraryProps={{ items: news }}
      pageID="news"
      pageTheme="light"
    />
  );
}

export default SavedNews;

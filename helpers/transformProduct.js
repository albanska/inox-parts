export function transformProduct(product) {
  const tagMap = {
    'produkt nr.': 'productId',
    'typ': 'typ',
    'länge mm': 'lange',
    'breite mm': 'breite',
    'höhe mm': 'hohe',
  };

  const priceOptionTag = product.tags.find(tag =>
    tag.title.toLowerCase().includes('preis pro')
  );

  const transformedIds = product.ids.map(idArray => {
    const mapped = {};

    product.tags.forEach((tag, idx) => {
      const title = tag.title.toLowerCase();
      const key = tagMap[title];

      if (title.startsWith('preis pro')) {
        mapped['price'] = idArray[idx].replace(/[^\d.,]/g, '').trim();
      } else if (key) {
        mapped[key] = idArray[idx];
      }
    });

    return mapped;
  });

  return {
    name: product.name,
    description: product.subName,
    info: product.info,
    addOn: product.addOn,
    img: product.img,
    priceOption: priceOptionTag?.title.split(' ').pop().replace('.', ''), // 'm' or 'stk'
    ids: transformedIds
  };
}

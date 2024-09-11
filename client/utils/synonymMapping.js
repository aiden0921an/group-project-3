const synonyms = {
    phone: ["cell", "mobile"],
    laptop: ["notebook", "computer"],
    // Add more synonyms here
  };

  function expandSearchTerms(query) {
  let terms = query.split(" ");
  terms = terms.flatMap(term => synonyms[term] || [term]);
  return terms.join(" ");
}

module.exports = expandSearchTerms;
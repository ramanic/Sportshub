const checkPreference = (tags, prefs) => {
  let allow = false;
  tags.map((tag) => {
    tag = tag.toLowerCase();
    prefs.map((pref) => {
      pref = pref.toLowerCase();
      if (pref.includes(tag) || tag.includes(pref) || pref == tag) {
        allow = true;
      }
    });
  });
  return allow;
};
module.exports = { checkPreference };

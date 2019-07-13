{
  'use strict';

  // Example #1
  const printName = () => {
    const message = 'My name is ';

    const displayName = name => {
      console.log(`${message}${name}`);
    }

    return displayName;
  };
  
  const name = printName();
  name('Yash Kapila');
}
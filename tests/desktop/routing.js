const assert = require('assert');

    it('Можно перейти из списка файлов в файл', function() {
        return this.browser
            .url('/')
            .isExisting('.ReposTable-Body')
            .then(() => this.browser.$('.ReposTable-Row').click())
            .getUrl()
            .then(url => {
                assert(url, '/test.txt/blob');
            });
    });

    it('Можно перейти из файла к списку', function() {
        return this.browser
            .url('/')
            .isExisting('.SubHeader-Item')
            .then(() => this.browser.$('.SubHeader-Item').click())
            .getUrl()
            .then(url => {
                assert(url, '/');
            });
    });


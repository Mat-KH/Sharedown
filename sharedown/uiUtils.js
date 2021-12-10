/**
 * This file is part of the Sharedown (https://github.com/kylon/Sharedown).
 * Copyright (c) 2021 Kylon.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";

const UIUtils = (() => {
    const _sharedownApi = window.sharedown;
    const UIutil = {};

    UIutil.initLoginModuleSelect = () => {
        const mselect = document.getElementById('loginmodlist');
        const mlist = _sharedownApi.sharedownLoginModule.getModuleList;
        const frag = new DocumentFragment();
        let i = 0;

        for (const m of mlist) {
            const node = document.createElement('option');

            node.value = (i++).toString();
            node.text = m;

            frag.append(node);
        }

        mselect.appendChild(frag);
    }

    UIutil.addLoginModuleFields = (globalSettingsModal) => {
        const container = globalSettingsModal.querySelector('.logfieldscont');
        const fields = _sharedownApi.sharedownLoginModule.getFields();

        container.innerHTML = '';

        if (!fields.length)
            return;

        const frag = new DocumentFragment();
        let i = 0;

        for (const inp of fields) {
            const col = document.createElement('div');
            const div = document.createElement('div');
            const label = document.createElement('label');
            const input = document.createElement('input');

            col.classList.add('col-12');
            div.classList.add('mb-3');
            label.classList.add('form-label');
            input.classList.add('form-control');

            label.textContent = inp.label;
            input.type = inp.type;
            input.id = 'loginModuleField' + (i++).toString();

            div.appendChild(label);
            div.appendChild(input);

            if (inp.desc !== '') {
                const desc = document.createElement('div');

                desc.classList.add('form-text');
                desc.textContent = inp.desc;
                div.appendChild(desc);
            }

            col.appendChild(div);
            frag.appendChild(col);
        }

        container.appendChild(frag);
    }

    UIutil.chromeUsrDataChangeEvt = (isChecked, globalSetModal) => {
        const loginModuleInpt = globalSetModal.querySelector('#loginmodlist');
        const msIDInpt = globalSetModal.querySelector('#username');

        if (isChecked) {
            if (loginModuleInpt.value !== 0) {
                loginModuleInpt.value = 0;
                loginModuleInpt.dispatchEvent(new Event('change'));
            }

            msIDInpt.setAttribute('disabled', '');
            loginModuleInpt.setAttribute('disabled', '');

        } else {
            msIDInpt.removeAttribute('disabled');
            loginModuleInpt.removeAttribute('disabled');
        }
    }

    Object.freeze(UIutil);
    return UIutil;
})();
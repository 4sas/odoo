import { expect, mountOnFixture, test } from "@odoo/hoot";
import { getTemplate } from "@web/core/templates";
import { contains, getMockEnv } from "@web/../tests/web_test_helpers";
import { Component, useState, xml } from "@odoo/owl";
import { OdooLogo } from "@point_of_sale/app/components/odoo_logo/odoo_logo";
import { CenteredIcon } from "@point_of_sale/app/components/centered_icon/centered_icon";
import { Input } from "@point_of_sale/app/components/inputs/input/input";
import { NumericInput } from "@point_of_sale/app/components/inputs/numeric_input/numeric_input";

test("test that generic components can be mounted; the goal is to ensure that they don't have any unmet dependencies", async () => {
    class TestComponent extends Component {
        static props = [];
        static components = {
            OdooLogo,
            CenteredIcon,
            Input,
            NumericInput,
        };
        static template = xml`
            <div class="test-container">
                <OdooLogo />
                <CenteredIcon icon="'fa-smile'"/>
                <Input tModel="[state, 'number']"/>
                <NumericInput tModel="[state, 'number']" />
            </div>
        `;
        setup() {
            this.state = useState({ number: 1 });
        }
    }

    await mountOnFixture(TestComponent, {
        getTemplate,
        env: getMockEnv(),
        test: true,
    });
    await contains("div.test-container");
    expect(true).toBe(true);
});

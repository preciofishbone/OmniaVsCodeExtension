import * as cp from "child_process";
import { VsCodeService } from "./VsCodeService";


export class TemplateService {

    private static _templateCache: TemplatePackage;

    static async getItemTemplates() {
        await this.ensureTemplates();
        return this._templateCache.items;
    }

    static async createFromTemplate(template: Template, name: string, tokenValue?: string) {
        const currentFolder = await VsCodeService.getCurrentFolder();
        let newCmd = `omnia dev new ${template.name} -n ${name} -o ${currentFolder}`;
        if (tokenValue) {
            newCmd += ` -t ${tokenValue}`;
        }
        await this.execShell(newCmd);
    }

    private static async ensureTemplates() {

        const curr = await VsCodeService.getCurrentFolder();
        console.dir('current:' + curr);
        //cp.exec(`cd ${curr} && dir`);
        console.log(await this.execShell(`cd ${curr} && dir`));
        let templatesJson = await this.execShell("omnia dev new -l -j");
        //Rmeove line breaks from cmd output
        templatesJson = templatesJson.replace(/(\r\n|\n|\r)/gm, "");
        let templates = JSON.parse(templatesJson) as TemplatePackage;
        this._templateCache = templates;
        //console.dir(templates);
    }

    private static execShell = async (cmd: string) =>
        new Promise<string>((resolve, reject) => {
            cp.exec(cmd, (err, out) => {
                if (err) {
                    return reject(err);
                }
                return resolve(out);
            });
        });


}
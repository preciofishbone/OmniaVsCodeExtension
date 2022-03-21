

interface TemplatePackage {
    items: Array<ItemTemplate>;
    projects: Array<ProjectTemplate>;
}

interface ItemTemplate extends Template {
    tokens: Array<Token>;
}

interface ProjectTemplate extends Template {

}

interface Template {
    name: string;
    description: string;
    requiresName: boolean;

}

interface TemplateSource {
    folder: string;
    files: Array<FileSource>;
}

interface FileSource {
    sourceName: string;
    outputName: string;
}

interface Token {
    name: string;
    upperCase: boolean;
    lowerCase: boolean;
    regexValidation: string;
}
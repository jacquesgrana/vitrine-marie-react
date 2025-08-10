class Library {
    public static getSlugFromField(field: string) {
        return field
            .normalize('NFD') // decompose les caracteres accentues
            .replace(/[\u0300-\u036f]/g, '') // supprime les diacritiques
            .replace(/\s+/g, '-') // remplace les espaces par des tirets
            .toLowerCase();
    }
};

export default Library;
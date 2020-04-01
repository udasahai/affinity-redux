let decode = (string) => {
    let flag = false;
    let output = "";

    for (const char of string) {
        if (char == 'u' && flag == false)
            continue;
        if (char == `'`) {
            flag = !flag
            output = output + '"'
            continue;
        }
        output = output + char
    }

    return output;
}


let authorsToMap = (authors) => {

    let hashmap = {}

    for (var index in authors) {
        let entry = authors[index]
        if ('AfN' in entry)
            if (entry['AfN'] in hashmap) {
                hashmap[entry['AfN']] = hashmap[entry['AfN']] + ', ' + entry['AuN']
            }
        else {
            hashmap[entry['AfN']] = entry['AuN']
        }
        else
        if ('others' in hashmap) {
            hashmap.others = hashmap.others + ' ,' + entry['AuN']
        }
        else {
            hashmap.others = entry['AuN'];
        }
    }

    return hashmap
}

let fieldsToString = (fields) => {
    let string = ""

    if (fields.length > 0) {
        string += `${(fields[0])['FN']}`
        for (var key in fields) {
            if (key == 0)
                continue;
            string += `, ${(fields[key])['FN']}`
        }
    }

    return string;
}

let sourcesToArray = (fields) => {
    let sources = []

    for (var key in fields) {
        sources.push((fields[key])['U']);
    }

    return sources;
}


let publicationParse = (pub) => {
    let ret = { ...pub };
    let authors = ret.authors;
    let map = authorsToMap(JSON.parse(decode(authors)))
    ret.authors = MapToString(map);
    let fields = ret.fieldsofStudy;
    ret.fields = fieldsToString(JSON.parse(decode(fields)));
    ret['source'] = sourcesToArray(JSON.parse(decode(ret['source'])));
    // ret.datePaper = new Date(ret.datePaper)

    return ret;
}


let MapToString = (map) => {
    let string = ""
    for (var key in map) {
        string += `( ${key} : ${map[key]} ) `
    }

    return string;
}

export default publicationParse;

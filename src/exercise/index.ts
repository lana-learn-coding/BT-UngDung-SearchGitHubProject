import '../scss/styles.scss';
import "isomorphic-fetch";
import * as $ from 'jquery';

let query = "angular";

interface ISingleRepo {
    name: string
}

interface IRepos {
    items: ISingleRepo[]
}

async function print(query: string | number | string[]): Promise<string> {
    let out: string = "";
    await fetch('https://api.github.com/search/repositories?q=' + query)
        .then((response: any) => response.json() as IRepos)
        .then((iRepos: any) => iRepos.items)
        .then((items: any) => {
            for (let item of items) {
                out += "<li>" + item.name + "<li>";
            }
        });
    return out;
}

print("angular").then((out: any) => {
    document.getElementById("ul").innerHTML = out;
});

$("#search").keydown( function (evt: any) {
    console.log($(this).val());
    if (evt.key === "Enter") {
        let query = $(this).val();
        print(query).then((out: any) => {
            document.getElementById("ul").innerHTML = out;
        });
    }
});


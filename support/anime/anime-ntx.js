/*
This Class is Use for Searching Anime or Maybe Manga
Commands Using this Class: Anime.js
 */

const jks = require('jikanjs');
//const embed = require('../../etc/HatsuEmbed');

class natsux {

    /**
     * @description Get Info About Anime you are Looking For
     * @param animeName Anime Title
     * @returns {Promise<{AnimeResult: [{Score: number, Type: string, Episodes: [string], Title: string, Synopsis: string, Total_Episodes: *}]}>}
     */
    async getAnimeInfo(animeName) {
        //Get Anime Info Using JikanJs
        const animdata = await jks.search('anime', `${animeName}`, 1);
        //Get Episode
        const episodeData = await jks.loadAnime(animdata.results[0].mal_id, 'videos');
        //Make A list for Episodes
        let episodeName = ``
        for (let a = 0; a < episodeData.episodes.length; a++) {
            episodeName += `${a + 1}.${episodeData.episodes[a].title}\n`
        }

        /*
        Put All the Result into an Array
        Include Title,ID,Episode, and Synopsis
         */
        return {
            AnimeResult: [{
                "Title": `${animdata.results[0].title}`,
                "Score": animdata.results[0].score,
                "Type": `${animdata.results[0].type}`,
                "Total_Episodes": animdata.results[0].episodes,
                "Synopsis": `${animdata.results[0].synopsis}`,
                "Episodes": [`${episodeName ? episodeName : "Cannot Find any Episode for this Anime"}`],
                "Thumbnail": `${animdata.results[0].image_url}`,
                "Link": `${animdata.results[0].url}`,
                "OnGoing": `${animdata.results[0].airing ? "This Anime is Still Ongoing!" : "This Anime is Completed!"}`,
                "Rated": `${animdata.results[0].rated}`
            }],
        }
    }
}

module.exports = natsux;
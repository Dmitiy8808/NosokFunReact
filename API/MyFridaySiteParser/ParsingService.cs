using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entitities;
using API.Interfaces;

namespace API.MyFridaySiteParser
{
    public class ParsingService : IParsingService
    {
        public async Task<string[]> GetSocksHrefs()
        {
           
            var pagehrefsHashSet = new HashSet<String>();
            var myFridaySettings = new MyFridaySettings();
            myFridaySettings.StartPont = 1;
            myFridaySettings.EndPont = 6;
            var htmlLoader = new HtmlLoader(myFridaySettings);
            var myFridayParser = new MyFridayHrefParser();
            for (int i = myFridaySettings.StartPont; i <= myFridaySettings.EndPont; i++)
            {
                var htmlPage = await htmlLoader.GetSourceByPageId(i);
                var pagehrefs = myFridayParser.Parse(htmlPage);
                pagehrefsHashSet.UnionWith(pagehrefs);
            }
            Console.WriteLine(pagehrefsHashSet.ToArray().Count());
            
            return pagehrefsHashSet.ToArray();
        }

        public async Task<List<Product>> GetParseProduct()
        {
            var myFridayProductSettings = new MyFridayProductSettings();
            var myFridayProductParser = new MyFridayProductParser();
            // var socksHrefs =  new string[] {
            //     "/allsocks/nabor_zabornaya_lirika/",
            //     "/allsocks/nabor_artefaktov/",
            //     "/allsocks/nabor_aytemsy_epokhi/",
            //     "/allsocks/nabor_klyukvennyy_nabor/",
            //     "/allsocks/nabor_priznaniya_bati/",
            //     "/allsocks/nabor_igrushki_nashego_dvora/",
            //     "/allsocks/nabor_nichego_ne_proizoshlo/",
            //     "/allsocks/noski_opa_s_ushami/",
            //     "/allsocks/nabor_statusy/",
            //     "/allsocks/nabor_iz_pesni_slov_ne_vybrosish/",
            //     "/allsocks/noski_korotkie_kogda_cherkizon_zakryli/",
            //     "/allsocks/noski_korotkie_kurenie_ubivaet/",
            //     "/allsocks/noski_korotkie_korotkaya_zhizn/",
            //     "/allsocks/noski_korotkie_v_poiskakh_vina/",
            //     "/allsocks/noski_korotkie_luchshe_ne_chitat/",
            //     "/allsocks/noski_korotkie_esli_vy_chitaete_eto_to_/",
            //     "/allsocks/noski_korotkie_malchik_ty_ne_ponyal/",
            //     "/allsocks/noski_korotkie_slozhnye_otnosheniya/",
            //     "/allsocks/noski_sport_vsye_sluchilos/",
            //     "/allsocks/noski_sport_chto_to_vse_taki_sluchilos/",
            //     "/allsocks/noski_sport_a_chto_sluchilos/"};
            var socksHrefs  =   await GetSocksHrefs();
            var productList = new List<Product>();
            foreach (var href in socksHrefs)
            {
                myFridayProductSettings.Prefix = href;
                var htmlLoader = new HtmlLoader(myFridayProductSettings);
                var htmlPage = await htmlLoader.GetSourceByPagePrefix();
                var product = myFridayProductParser.Parse(htmlPage);
                productList.Add(product);
            }
            return productList;
            
        }
    }
}
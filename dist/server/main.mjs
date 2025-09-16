import { expressServer } from "@rpgjs/server/express";
import { Components, Control, EventData, RpgEvent, RpgModule, RpgWorld } from "@rpgjs/server";
import * as url from "url";

// --- Configuración del mundo ---
const _main_worlds_myworldworld = {
    maps: [
        { fileName: "maps/simplemap.tmx", height: 640, width: 800, x: 64, y: -160 },
        { fileName: "maps/simplemap2.tmx", height: 640, width: 640, x: -160, y: 480 }
    ],
    onlyShowAdjacentMaps: false,
    type: "world",
    basePath: "./main/worlds",
    id: "./main/worlds/myworld.world"
};

// --- Evento de NPC ---
let VillagerEvent = class extends RpgEvent {
    onInit() {
        this.setGraphic("female");
    }
    async onAction(player) {
        await player.showText("I give you 10 gold.", { talkWith: this });
        player.gold += 10;
    }
};
VillagerEvent = EventData({
    name: "EV-1",
    hitbox: { width: 32, height: 16 }
})(VillagerEvent);

// --- Configuración del jugador ---
const player = {
    onConnected: async (player) => {
        // Tomar el parámetro 'player' de la URL
        let playerName = "Invitado";
        try {
            const urlParams = new URL(player.client.url).searchParams;
            const nameFromUrl = urlParams.get("player");
            if (nameFromUrl) playerName = nameFromUrl;
        } catch (e) {
            console.log("No se pudo obtener el nombre del jugador de la URL", e);
        }

        // Asignar nombre y componentes
        player.name = playerName;
        player.setComponentsTop(Components.text("{name}"));
        player.setGraphic("hero");
        player.setHitbox(16, 16);

        // Cambiar al mapa inicial
        await player.changeMap("simplemap");
    },

    onInput(player, { input }) {
        if (input === Control.Back) player.callMainMenu();
    },

    async onJoinMap(player) {
        if (player.getVariable("AFTER_INTRO")) return;
        await player.showText("Bienvenido a ChainRPG...");
        player.setVariable("AFTER_INTRO", true);
    }
};

// --- Configuración del módulo principal ---
let RpgServerModuleEngine = class {};
RpgServerModuleEngine = RpgModule({
    player,
    events: [VillagerEvent],
    database: [],
    maps: [],
    worldMaps: [_main_worlds_myworldworld]
})(RpgServerModuleEngine);

// --- Módulos RPGJS ---
const modules = [
    { client: null, server: RpgServerModuleEngine },
    { client: null }, // mobile GUI
    { client: null }, // default GUI
    { client: null }  // gamepad
];

// --- Configuración global ---
const globalConfig = {
    startMap: "simplemap",
    start: { map: "simplemap", graphic: "hero", hitbox: [16, 16] },
    compilerOptions: { build: { pwaEnabled: true, outputDir: "dist" } },
    modulesRoot: "",
    autostart: true,
    name: "My Game"
};

// --- Directorio base ---
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// --- Iniciar servidor Express RPGJS ---
expressServer(modules, {
    globalConfig,
    basePath: __dirname,
    envs: {
        VITE_BUILT: 1,
        VITE_SERVER_URL: undefined,
        VITE_GAME_URL: undefined,
        VITE_RPG_TYPE: "mmorpg",
        VITE_ASSETS_PATH: "",
        VITE_REACT: true
    }
}).then(({ server, game }) => {
    if (import.meta.hot) {
        import.meta.hot.on("vite:beforeFullReload", () => {
            server.close();
            RpgWorld.getPlayers().forEach((player) => player.gameReload());
            game.stop();
        });
    }
});

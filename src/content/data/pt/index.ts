import type { LocaleContent } from "../../types";
import site from "./site.json";
import form from "./form.json";
import home from "./home.json";
import pages from "./pages.json";
import services from "./services.json";
import projects from "./projects.json";
import process from "./process.json";
import principles from "./principles.json";
import legal from "./legal.json";

// JSON imports widen string literals, so the shape is asserted against LocaleContent here.
const content = { site, form, home, pages, services, projects, process, principles, legal } as LocaleContent;

export default content;

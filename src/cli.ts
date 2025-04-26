#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import installCommand from "./commands/install";

yargs(hideBin(process.argv)).command(installCommand).demandCommand(1, "You need to provide a valid command").strict().help().argv;


import 'mutationobserver-shim'
import { observe } from '../src/observe'
import tests from './all_test'
import digi, * as all from '../src/main'

global.MutationObserver = window.MutationObserver
observe()

tests({ digi, all })

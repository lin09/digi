jest.useFakeTimers()

import 'mutationobserver-shim'
global.MutationObserver = window.MutationObserver
import { observe } from '../src/observe'
observe()

import tests from './all_test'
import digi, * as all from '../src/main'

tests({ digi, all })
